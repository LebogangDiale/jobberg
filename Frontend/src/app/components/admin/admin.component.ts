import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate.service';
import { RecruiterService } from 'src/app/services/recruiter.service';
import { AdminService } from 'src/app/services/admin.service';
import { RegistrationService } from '../../services/registration.service';
import {LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
// import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router,private formBuilder: FormBuilder,private candidateService:CandidateService,private adminService:AdminService,private recruiterService:RecruiterService,private registrationService: RegistrationService,private loginService: LoginService) { }

  registerForm = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('',[Validators.required]),
    phone_number: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(13)]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    checkbox:new FormControl('',[Validators.required])
  });

  get Form(){
    return this.registerForm.controls;
  }

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
    if(this.admin==null){
      alert("youre not authorized to view this page")
      this.router.navigateByUrl('/login',{replaceUrl:true});
    }
      this.getMethrics()
      this.getAllActCandidates();
      this.getAllActRecruiters();
      this.getActiveAdmins();
      this.getProfile();
  }


  numUsers:any=0;
  numActiveUsers:any=0;
  numNonActiveUsers:any=0;
  numCandidates:any=0;
  numAdmins:any=0;
  numRecruiters:any=0;
  users:any=[];
  admins:any=[];
  candidates:any=[];
  recruiters:any=[];
  nonActiveUsers:any=[];
  spinnerState:boolean=false;

  getMethrics(){
    this.adminService.getusers().subscribe((res:any)=>{
      this.numUsers=res.length
      console.log(this.numUsers);
    });
  
    this.adminService.getActiveUsers().subscribe((res:any)=>{
      this.numActiveUsers=res.length
      this.users=res;
      console.log('the response '+res.length);
      
      // console.log(this.users[0]. +" the users");
      console.log('where it starts to fail');
      
      for(var i=0;0<this.users.length;i++){
        
        console.log(this.users[i].roles);
        
        if(this.users[i].roles==='candidate'){
          this.numCandidates++;
        }else if(this.users[i].roles==='recruiter') {
          this.numRecruiters++;
        }else if(this.users[i].roles==='admin'){
            this.numAdmins++
        }
      };
    });

    this.adminService.getNonActiveUsers().subscribe((res:any)=>{
      this.numNonActiveUsers=res.length
      console.log("number of admins ")

      this.nonActiveUsers=res
      
      console.log(res.length);
    });
    
  };
  
  getAllActCandidates(){
    this.candidateService.getCandidates().subscribe((res:any)=>{
      console.log('all active candidates');
      this.candidates=res;
      console.log(this.candidates);
    })
  }
  
  


  getAllActRecruiters(){
    this.recruiterService.getActRecruiters().subscribe((res:any)=>{
      this.recruiters=res;
      console.log("all the active recruiters ");
      console.log(this.recruiters)
    })
  }

  getActiveAdmins(){
    this.adminService.getActAdmins().subscribe((res:any)=>{
      this.admins=res;
      console.log("all the active admins ");
      console.log(this.admins);
    })
  }
    

  removeUserById(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "The user will be removed from the table!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, deactivate it!',
      confirmButtonColor: "red",
      cancelButtonText: 'No, keep it',
      cancelButtonColor:'blue'
    }).then((result) => {

      if (result.isConfirmed) {
        this.adminService.removeUserById(id).subscribe(res=>{
          // console.log(res)
          this.ngOnInit();
          
        })
        
        Swal.fire('', 'User successfully removed', 'success')
        this.ngOnInit();
      } else if (result.isDismissed) {
        this.ngOnInit()
      }
    })
  }

  activateUserAccount(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "The user account be reactivated!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, activate it!',
      confirmButtonColor: "blue",
      cancelButtonText: 'No, keep inactive',
      cancelButtonColor:'red'
    }).then((result) => {

      if (result.isConfirmed) {
        this.adminService.activateUserByd(id).subscribe(res=>{
          // console.log(res)
          this.ngOnInit();
        })
        
        Swal.fire('', 'User successfully activated', 'success')
        this.ngOnInit();
      } else if (result.isDismissed) {
        this.ngOnInit()
      }
    })

  }


  register(){
    console.log(this.registerForm.value);
    this.registrationService.registerAdmin(this.registerForm.value).subscribe({
      next:(data) =>{
        console.log(data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Account has been successfully registered',
          showConfirmButton: false,
          timer: 1500
        })
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

  registerRecruiter(){
    console.log(this.registerForm.value);
    this.registrationService.registerRecruiter(this.registerForm.value).subscribe({
      next:(data) =>{
        console.log(data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Account has been successfully registered',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (e) => (
        console.log(e),
         Swal.fire({  
          confirmButtonColor: "red",
          icon: 'error',  
          title: e.error.error,  
          })
      )
  })
}

  admin = localStorage.getItem('admin');
  adminDetails: any=[];

  getProfile(){
    this.adminDetails = JSON.parse(localStorage.getItem('admin') || '{}');
    this.adminService.getUserById(this.adminDetails.id).subscribe((res: any)=>{
      this.adminDetails = res;
      console.log('it works');
      
      console.log(this.adminDetails);
      
      console.log(this.adminDetails.id);
      console.log(this.adminDetails.first_name);
    });
    
  }

  updateRecruiterPassword(){
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
       
    //  
      

    }else{
      Swal.fire({  
        confirmButtonColor: "red",
        icon: 'error',  
        title: "Password does not match", 
        footer: 'Please verify credentials'})

    }
    
    
  }

  

  

}
