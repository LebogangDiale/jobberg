import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-recruiter-registration',
  templateUrl: './recruiter-registration.component.html',
  styleUrls: ['./recruiter-registration.component.scss']
})
export class RecruiterRegistrationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService,private router: Router) { }

  spinnerState:boolean=false;

  recruiterRegisterForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('',[Validators.required]),
    phone_number: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(13)]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    checkbox:new FormControl('',[Validators.required])
  });

  get Form(){
    return this.recruiterRegisterForm.controls;
  }

  ngOnInit(): void {
    // this.register();
  }

  
  register(){
    console.log(this.recruiterRegisterForm.value);
    this.registrationService.registerRecruiter(this.recruiterRegisterForm.value).subscribe({
      next:(data) =>{
        console.log(data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your account has been successfully registered',
          showConfirmButton: false,
          timer: 1500
        })
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

}
