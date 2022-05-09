import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Candidate } from 'src/app/models/candidates.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }
  recruiter=localStorage.getItem('recruiter');
  admin=localStorage.getItem('admin');
  candidate=localStorage.getItem('candidate');

  ngOnInit(): void {
    if(this.recruiter!==null){
      alert('Youre not authorized to access this page, please logout first.')
      this.router.navigateByUrl('/wishlist',{replaceUrl:true});
    }else if(this.admin!==null){
      alert('Youre not authorized to access this page, please logout first.')
      this.router.navigateByUrl('/admin',{replaceUrl:true});
    } else if(this.candidate!==null){
      alert('Youre not authorized to access this page, please logout first.')
      this.router.navigateByUrl('/profile',{replaceUrl:true});
    }
  }

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
  });

  get Form(){
    return this.forgotForm.controls;
  }

  resetPassword(): void {
    console.log(this.forgotForm.value)

    this.loginService.forgotPassword(this.forgotForm.value).subscribe({
      next: (response) => {
        
        let passwordExists = response.result[0].fn_forgot_password;

        if(passwordExists){
          Swal.fire(
            'Good job!',
            'A new password has been sent to your email!',
            'success'
          )
          this.router.navigateByUrl('/user-login',{replaceUrl:true});
        }
        
      },
      error: (err) => {
        let message = 'Email does not exist';
        let errorMessage = err.error.error;
        if(errorMessage == message){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'This email does not exist!'
          })
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to reset email!'
          })
        }
        console.log("Email does not exist",err.error.error);
      }
    })
  }

}
