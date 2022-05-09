import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { RegistrationService } from '../../services/registration.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  videos:any;
  documents:any;
  resumes:any
  spinnerState:boolean=false;
  


  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService,private router: Router) { }

  registerForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('',[Validators.required]),
    checkbox:new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    highestQual: new FormControl('',[Validators.required]),
    highestCertificate: new FormControl('',[Validators.required]),
    videoResume:new FormControl('',[Validators.required]),
    resume:new FormControl('',[Validators.required]),
    culture:new FormControl('',[Validators.required]),
  });

  get Form(){
    return this.registerForm.controls;
  }

  candidateTable:any = {
    videoResumeUrl:"",
    certificateUrl:"",
    resumeUrl:"",
  
  }
  docs:any = {
    first_name:"",
    last_name:"",
    email:"",
    highest_qualification:"",
  }

  onVideoChange(event:any) {
    if (event.target.files.length > 0) {
      this.videos = event.target.files[0];
      console.log(this.videos)
    }
  }

  onCertificateDocChange(event:any) {
    if (event.target.files.length > 0) {
      this.documents = event.target.files[0];
      console.log(this.documents)
    }
  }
  onResumeDocChange(event:any) {
    if (event.target.files.length > 0) {
      this.resumes = event.target.files[0];
      console.log(this.resumes)
    }
  }
  
//REGISTER CANDIDATE TO CANDIDATE TABLE
  async register (){
    this.spinnerState=true;
    this.candidateTable= {
      first_name:this.registerForm.value.first_name,
      last_name:this.registerForm.value.last_name,
      email:this.registerForm.value.email,
      highest_qualification:this.registerForm.value.highestQual,
      phone_number:this.registerForm.value.phone_number,
      culture:this.registerForm.value.culture,
    }
    
    console.log(this.registerForm.value);
    console.log(this.candidateTable);
    await this.uploadCertificate();
    await this.uploadVideo();
    await this.uploadResumeFile();
    await this.registrationService.registerCandidate(this.candidateTable).subscribe({
      next:(data) =>{
        if(data == 'Welcome back!'){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Welcome back!',
            showConfirmButton: false,
            timer: 1500
          })
        }else{
        console.log("The data...",data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your account has been successfully registered',
          showConfirmButton: false,
          timer: 1500
        })
      }
        this.router.navigate(['/login']);
      },
      error: (e) => (
        console.log(e),
         Swal.fire({  
          confirmButtonColor: "red",
          icon: 'error',  
          title: e.error.error,  
          })
      )
    
  });
    
  }

  
 

  

  uploadVideo(){
     const formData = new FormData()
     formData.append('videos', this.videos)

     

     console.log('The video I got')
     console.log(formData.get('videos'));
 
     this.registrationService.uploadVideo(formData).subscribe((data) => {
        console.log(data, 'Uploaded');
        console.log('This document')
        
        console.log(data)
        console.log('End of documents')
    })
  }

  uploadCertificate(){
    const formData = new FormData()
    formData.append('documents', this.documents)
     console.log('The documents I got')
     console.log(formData.get('documents'));
 
     this.registrationService.uploadDocument(formData).subscribe((data) => {
        console.log(data, 'Uploaded');
        console.log('This document')
        
        console.log(data)
        console.log('End of documents')
       })
  }

  uploadResumeFile(){
    const formData = new FormData()
    formData.append('resumes', this.resumes)
     console.log('The resume I got')
     console.log(formData.get('resumes'));
 
     this.registrationService.uploadResume(formData).subscribe((data) => {
        console.log(data, 'Uploaded');
        console.log('This resume')
        
        console.log(data)
        this.spinnerState=false;
        console.log('End of resume file')
       })
       
  }
  

  ngOnInit(): void {
    
  }

}
