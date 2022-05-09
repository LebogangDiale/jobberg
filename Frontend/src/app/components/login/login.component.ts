import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/models/candidates.model';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  


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
    console.log('**********************************');
    

    this.loginService.login(this.loginForm.value).subscribe({
      next:(data)=>{
        const user=data;
        console.log(user)
        if(user.roles=='candidate'){
          console.log('1*********************************************');
          
          localStorage.setItem("candidate", JSON.stringify(user));
          this.router.navigateByUrl('/profile',{replaceUrl:true});
          //window.location.reload();
        }else if(user.roles=='recruiter'){
          console.log('2*********************************************');
          localStorage.setItem("recruiter", JSON.stringify(user));
          this.router.navigateByUrl('/wishlist',{replaceUrl:true});
          // alert('recruiter heufhewufw')
        }else if(user.roles=='admin'){
          console.log('3*********************************************');
          localStorage.setItem("admin", JSON.stringify(user));
          this.router.navigateByUrl('/admin',{replaceUrl:true});
        }else{
          this.ngOnInit();
        }

        this.isloading=false;
      },
      error: (e) => (
        console.log(e),
         Swal.fire({  
          confirmButtonColor: "red",
          icon: 'error',  
          title: e.error.error,  
          footer: 'Please verifty your login credentials'}),
          this.isloading=false
      
      )


    })

    

  }

  

}
