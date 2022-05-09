import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { RecruiterService } from 'src/app/services/recruiter.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-candidatefavs',
  templateUrl: './candidatefavs.component.html',
  styleUrls: ['./candidatefavs.component.scss']
})
export class CandidatefavsComponent implements OnInit {
  filterTerm!: string; 
  candidateProfiles:any=[];
  recruiterDetails = JSON.parse(localStorage.getItem('recruiter') || '{}');
  recruiterProfile:any=[];

  constructor(private candidateService:CandidateService,private searchService: SearchService,private recruiterService: RecruiterService,private router:Router, private loginService: LoginService) { }

  updatePassword = new FormGroup({
    compareNewPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
  });

  get form(){
    return this.updatePassword.controls;
  }
  

  ngOnInit(): void {
    if (this.recruiterDetails == null) {
      alert("You're not authorized to view this page, please login as a recruiter")
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }

    this.getCandidateShortlist();
    console.log(this.recruiterProfile);
    
    this.getRecruiterProfile();
    this.filterTerm = this.searchService.getSearchData().search;
    
    
  }

  getCandidateShortlist(){
    this.recruiterService.getShortListedCandidates(this.recruiterDetails.id).subscribe(res=>{
      this.candidateProfiles=res
    })
  }



  removeCandidate(fk_candidate_id:any){
    console.log("the removed canidate "+fk_candidate_id);
    console.log(this.recruiterDetails.id);
    
    
    this.recruiterService.removedListedCandidates(this.recruiterDetails.id,String(fk_candidate_id)).subscribe(res=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Candidate has been successfully removed from shortlist',
        showConfirmButton: false,
        timer: 1500
      })
      this.ngOnInit();
    })

  }

  getRecruiterProfile(){
    this.recruiterService.getRecruiterById(this.recruiterDetails.id).subscribe(res=>{
      this.recruiterProfile=res;
      console.log(this.recruiterProfile);
    })

  }

  routeToProfile(id:any){
    // routerLink="/candidate/{{user.fk_candidate_id}}
    
      this.router.navigateByUrl('/candidate/'+id,{replaceUrl:true});

  
  }

  updateUserPassword(){
    console.log(this.updatePassword.value);

    if(this.updatePassword.value.newPassword==this.updatePassword.value.compareNewPassword){
      console.log('match');
      // 
      this.loginService.updatePassword(this.updatePassword.value).subscribe({
        next:(data)=>{
          console.log(data)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data,
            showConfirmButton: false,
            timer: 1500
          })
          this.ngOnInit()
        },
        error: (e) => (
          console.log(e),
           Swal.fire({  
            confirmButtonColor: "red",
            icon: 'error',  
            title: e.error.error,  
            footer: 'Please verifty your login credentials'}),
            this.ngOnInit()
        )
      })
    }else{
      Swal.fire({  
        confirmButtonColor: "red",
        icon: 'error',  
        title: "Password does not match", 
        footer: 'Please verify credentials'})
    }
  }
}


