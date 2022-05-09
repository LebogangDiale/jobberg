import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-real-login',
  templateUrl: './real-login.component.html',
  styleUrls: ['./real-login.component.scss']
})
export class RealLoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
  });

  get Form(){
    return this.loginForm.controls;
  }

  constructor(private loginService: LoginService,private formBuilder: FormBuilder,private router: Router) { }

  ngOnInit(): void {
  }

  isloading:boolean=false;

  login():void{
    this.isloading=true;
    console.log(this.loginForm.value);
    

    this.loginService.login(this.loginForm.value).subscribe({
      next:(data)=>{
        const user=data;
        console.log(user)
        if(user.roles=='candidate'){
          
          localStorage.setItem("candidate", JSON.stringify(user));
          this.router.navigateByUrl('/profile',{replaceUrl:true});
        }else if(user.roles=='recruiter'){
          localStorage.setItem("recruiter", JSON.stringify(user));
          this.router.navigateByUrl('/wishlist',{replaceUrl:true});
        }else if(user.roles=='admin'){
          localStorage.setItem("admin", JSON.stringify(user));
          this.router.navigateByUrl('/admin',{replaceUrl:true});
        }else{
          this.ngOnInit();
        }
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })

        this.isloading=false;
      },
      error: (e) => (
        console.log(e),
         Swal.fire({  
          confirmButtonColor: "red",
          icon: 'error',  
          title: e.error.error,  
          footer: 'Please verify your login credentials'}),
          this.isloading=false
      
      )


    })

    

  }

}
