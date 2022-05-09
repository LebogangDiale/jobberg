import { Component, OnInit } from '@angular/core';
import { RecruiterService } from 'src/app/services/recruiter.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-recruiter-dasboard',
  templateUrl: './recruiter-dasboard.component.html',
  styleUrls: ['./recruiter-dasboard.component.scss']
})
export class RecruiterDasboardComponent implements OnInit {
  isShortListed = true;
  recruiter = localStorage.getItem('recruiter')
  recruiterDetails = JSON.parse(localStorage.getItem('recruiter') || '{}');
  recruiterInfo: any = [];


  constructor(private recruiterService: RecruiterService, private candidateService: CandidateService, private loginService: LoginService) { }

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
    console.log(this.recruiterDetails);
    this.getRecruiterProfile()


  }
  shortlist(){
    
  }




  getRecruiterProfile() {
    this.recruiterService.getRecruiterById(this.recruiterDetails.id).subscribe((res: any) => {
      console.log(res[0]);
      this.recruiterInfo = res[0]

    })
  }

}
