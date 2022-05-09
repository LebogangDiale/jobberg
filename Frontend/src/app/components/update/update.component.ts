import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate.service';
import { RegistrationService } from 'src/app/services/registration.service';
import {LoginService} from 'src/app/services/login.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  

  constructor(private formBuilder: FormBuilder,private router:Router, private candidateService:CandidateService,private registrationService:RegistrationService,private loginService:LoginService) { }
  candidate:any = localStorage.getItem('candidate');
  candidateBefore:any = JSON.parse(localStorage.getItem('candidate') || '{}');
  candidateDetails:any = JSON.parse(localStorage.getItem('candidate') || '{}');
  profilePic:any='';
  resume:any='';
  certificate:any=''
  video:any='';
  picUrl:any='';

  spinnerState1:boolean=false;
  spinnerState2:boolean=false;
  spinnerState3:boolean=false;
  spinnerState4:boolean=false;
  spinnerState5:boolean=false;

  updatePassword = new FormGroup({
    compareNewPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
  });


  get form(){
    return this.updatePassword.controls;
  }

  updateForm = new FormGroup({
    bio: new FormControl('', [Validators.required]),
    province: new FormControl('',[Validators.required]),
    city:new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    skills: new FormControl('',[Validators.required]),
    experience:new FormControl('',[Validators.required]),
    interests:new FormControl('',[Validators.required]),
    job_title:new FormControl('',[Validators.required]),
    highest_qualification:new FormControl('',[Validators.required]),
    phone_number: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(14)]),
    profile_pic: new FormControl('',[Validators.required]),
    resume: new FormControl('',[Validators.required]),
    // highestQual: new FormControl('',[Validators.required]),
    highestCertificate: new FormControl('',[Validators.required]),
    videoResume:new FormControl('',[Validators.required]),
    education:new FormControl('',[Validators.required]),
    culture: new FormControl('',[Validators.required]),
  });

  get Form(){
    return this.updateForm.controls;
  }

  ngOnInit(): void {

    if(this.candidate==null){
      alert("youre not authorized to view this page")
      this.router.navigateByUrl('/login',{replaceUrl:true});
    }
    console.log(this.candidateDetails);
    this.getProfile();
      
      
      
    
  }

  getProfile() {
    this.candidateService.getCandidateProfile(this.candidateBefore.id).subscribe((res: any) => {
      this.candidateDetails = res;
      console.log(this.candidateDetails);
      

    })

  }

  updateProfileText(){
    // this.updateForm.value
    this.spinnerState2=true;
    console.log(this.updateForm.value);
    console.log('it afirfir');
    this.candidateService.updateCandidateProfile(this.candidateDetails.fk_candidate_id,this.updateForm.value).subscribe((res: any) => {
      console.log(res);
      this.spinnerState2=false;
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your profile has been successfully updated',
        showConfirmButton: false,
        timer: 1700
      })
    })
  }

  onPicChange(event:any) {
    if (event.target.files.length > 0) {
      this.profilePic = event.target.files[0];
      console.log(this.profilePic)
      this.uploadPicture
    }
  }

  onResumeChange(event:any) {
    if (event.target.files.length > 0) {
      this.resume = event.target.files[0];
      console.log(this.resume)
      this.updateResume()
    }
  }

  onVideoChange(event:any) {
    if (event.target.files.length > 0) {
      this.video = event.target.files[0];
      console.log(this.video)
      this.updateVideoResume()
    }
  }

  onCertificateChange(event:any) {
    if (event.target.files.length > 0) {
      this.certificate = event.target.files[0];
      console.log(this.certificate)
      this.updateCertificate()
    }
  }
  
 uploadPicture(){
   this.spinnerState1=true;
    const formData = new FormData()
    formData.append('images', this.profilePic)
     console.log('The image I got')
     console.log(formData.get('images'));

   this.registrationService.uploadImage(formData,this.candidateDetails.fk_candidate_id).subscribe((data) => {
       console.log(data, 'Uploaded');
       console.log('This video')
       this.picUrl= data;
       
       console.log(data)
       console.log('End of resume file')
       this.spinnerState1=false;
       Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your Profile picuture has been successfully updated',
        showConfirmButton: false,
        timer: 1700
      })
       this.ngOnInit()
      
     })
     

    
  }
  async updateResume(){
    this.spinnerState3=true;
    const formData = new FormData()
    formData.append('resumes', this.resume)
    console.log('The image I got')
    console.log(formData.get('resumes'));

   this.registrationService.updateResume(formData,this.candidateDetails.fk_candidate_id).subscribe((data) => {
     console.log(data, 'Uploaded');
     console.log('This video')
     this.picUrl= data;
       
     console.log(data)
     console.log('End of resume file')
     Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your Resume has been successfully updated',
      showConfirmButton: false,
      timer: 1700
    })
     this.spinnerState3=false;
    })
    this.ngOnInit()
    
  }


  async updateVideoResume(){
    this.spinnerState4=true;
    const formData = new FormData()
    formData.append('resumes', this.video)
    console.log('The image I got')
    console.log(formData.get('resumes'));

   this.registrationService.updateResume(formData,this.candidateDetails.fk_candidate_id).subscribe((data) => {
     console.log(data, 'Uploaded');
     console.log('This video')
     this.picUrl= data;
       
     console.log(data)
     console.log('End of resume file')
     Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your Video Resume has been successfully updated',
      showConfirmButton: false,
      timer: 1700
    })
     this.spinnerState4=false;
    })
    this.ngOnInit()
    
  }

  async updateCertificate(){
    this.spinnerState5=true;
    const formData = new FormData()
    formData.append('documents', this.certificate)
    console.log('The image I got')
    console.log(formData.get('documents'));

   this.registrationService.updateCertificate(formData,this.candidateDetails.fk_candidate_id).subscribe((data) => {
     console.log(data, 'Uploaded');
     console.log('This video')
     this.picUrl= data;
       
     console.log(data)
     console.log('End of resume file')
     Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your Certificate has been successfully updated',
      showConfirmButton: false,
      timer: 1700
    })
     this.spinnerState5=false;
    })
    this.ngOnInit()
    
  }

  routeToProfile(id:any){
      this.router.navigateByUrl('/profile',{replaceUrl:true});
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
