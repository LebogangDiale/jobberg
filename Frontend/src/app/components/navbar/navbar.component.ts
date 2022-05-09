import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  // localStorage.setItem("candidate", JSON.stringify(user));
    // localStorage.setItem("recruiter", JSON.stringify(user));
    admin = localStorage.getItem('admin');
    recruiter = localStorage.getItem('recruiter');
    candidate = localStorage.getItem('candidate');

    logOut(){
      localStorage.clear();
      
      this.router.navigateByUrl('/user-login',{replaceUrl:true});
      
    }


    
    title = 'Frontend';
  
    
  
    hide(){
      if(this.router.url =='/landing')
      {
        return false
      }
  
      return true
    }

}
