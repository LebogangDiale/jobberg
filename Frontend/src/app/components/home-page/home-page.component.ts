import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AdminService } from 'src/app/services/admin.service';
import { SearchService } from 'src/app/services/search.service';
import { CandidateService } from 'src/app/services/candidate.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  sendMailForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    message: new FormControl('', [Validators.required]),
  });

  formSearch = new FormGroup({
    search: new FormControl('',Validators.required)
 })

  get Form(){
    return this.sendMailForm.controls;
  }

  get Search(){
    return this.formSearch.controls;
  }
  get CandidateProfiles(){
     return this.candidateProfiles;
  }


  filterTerm!: string;
  userRecords = [
    { id: '1', name: 'Adam Smith', location: 'Pretoria' ,description: 'Human Resource Business Partner - Brand Management and Sales at LegalWise.',},
    { id: '2', name: 'Sarah Smith', location: 'Durban' ,description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
    { id: '3', name: 'Adam Cooper', location: 'California' ,description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
    { id: '4', name: 'John Smith', location: 'Durban' ,description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
    { id: '5', name: 'Mary Smith', location: 'Pretoria' ,description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
    { id: '6', name: 'Adam Carter', location: 'Johannesburg' ,description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
    { id: '7', name: 'James Smith', location: 'Pretoria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
    { id: '8', name: 'Larry Smith', location: 'Pretoria' ,description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
    { id: '9', name: 'Adam Bond', location: 'Pretoria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
    { id: '10', name: 'Jack Smith', location: 'Pretoria' ,description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
    { id: '11', name: 'Jamie Hart', location: 'Pretoria', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
  
  ]
  constructor(private candidateService:CandidateService,private formBuilder: FormBuilder,private adminService:AdminService, private searchService: SearchService) { }

  candidateProfiles:any=[];

  mockdata = [
    { id: '1', name: 'Adam Smith', location: 'Pretoria' ,description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
  ];
    
  mockdata1 = [
    { id: '2', name: 'Sarah Smith', location: 'Durban' ,description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
  ];

  mockdata3= [
    { id: '3', name: 'Adam Cooper', location: 'California' ,description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
  ];
  mockdata4 = [
    { id: '4', name: 'John Smith', location: 'Durban' ,description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
  ];
  mockdata5 = [
    { id: '5', name: 'Mary Smith', location: 'Pretoria' ,description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.', profilepicture: './assets/philip-martin-5aGUyCW_PJw-unsplash.jpeg'},
  ];
  mockdata6 = [
    { id: '6', name: 'Adam Carter', location: 'Johannesburg' ,description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.'},
  ];

   
  ngOnInit(): void {
    this.getAllCandidateProfiles()
  }
  

  sendMail(){
    console.log(this.sendMailForm.value);
    this.adminService.sendFeed(this.sendMailForm.value).subscribe({
      next:(data)=>{

          swal.fire({icon: 'success',
          title: 'Your message has been sent',
          showConfirmButton: false,
          timer: 1500})

        console.log(data);
        }

      })
    }

  search(){
    console.log(this.formSearch.value);
    this.searchService.setSearchData(this.formSearch.value)
  }

  //this service returns a list of candidate profiles, check console for the data that is being returned.
  //the data is stored on the 'candidateProfiles' object
  getAllCandidateProfiles(){
    this.candidateService.getCandidateShortList().subscribe(res=>{
      this.candidateProfiles=res
      console.log(this.candidateProfiles);
    })
  }

  


}
