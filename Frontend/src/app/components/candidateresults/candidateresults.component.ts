import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { CandidateService } from 'src/app/services/candidate.service';
import { RecruiterService } from 'src/app/services/recruiter.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PaginatePipe } from 'ngx-pagination';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-candidateresults',
  templateUrl: './candidateresults.component.html',
  styleUrls: ['./candidateresults.component.scss']
})
export class CandidateresultsComponent implements OnInit {
  filterTerm!: string;
  filterQualification=''; 
  filterLocation='';
  filterCulture='';
  candidateProfiles:any=[];
  numCandidates:any=0;
  recruiter=localStorage.getItem('recruiter');
  RecruiterDetails = JSON.parse(localStorage.getItem('recruiter') ||"{}")
  p: number =1;
  total: number = 0;
  user:any;
  userList=[];
  selectedUser: number=0;
  

  constructor(private candidateService:CandidateService, private searchService: SearchService, private recruiterService: RecruiterService, private router:Router) { }
  
  
  
  
  ngOnInit(): void {
    this.getAllCandidateProfilesList()
    this.getAllCandidateProfiles();
    this.filterTerm = this.searchService.getSearchData().search;
    this.getUsers()
    // console.log('loading data')
    // console.log(this.candidateProfiles)
    // this.getAllCandidateProfilesList()
    // this.filterSearchResults("queen")

    // document.querySelector('.search-field')?.addEventListener('keyup', () => {
    //   const keywordValue = (document.querySelector('.search-field') as HTMLInputElement).value;
    //   this.filterSearchResults(keywordValue)
    // })

  }
  getUsers(){
    this.candidateService.getUsers(this.p)
      .subscribe((response: any) => {
        // console.log(response);
        this.user= response.data;
        this.total = response.total;
      });

  }

  pageChangeEvent(event:number){
    this.p=event;
    this.getUsers();
  }

  getAllCandidateProfiles(){
    // console.log("the recruiter information " +this.RecruiterDetails.id);
    this.candidateService.getAllCandidateProfiles().subscribe(res=>{
      this.candidateProfiles=res
    })
  }


  AddCandidateToShortlist(id:any){
    
    const shortlist:any={fk_candidate_id:id, fk_guest_id:this.RecruiterDetails.id}
    this.recruiterService.addToShortList(shortlist).subscribe({
      next:(data) =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Candidate successfully added to shortlist',
          showConfirmButton: false,
          timer: 1500
        })
    },
    error: (e) => (
      // console.log(e),
       Swal.fire({  
        confirmButtonColor: "red",
        icon: 'error',  
        title: e.error.error,  
        })
    )
  
  })
  }


  routeToProfile(id:any){
    // routerLink="/candidate/{{user.fk_candidate_id}}
    this.candidateService.updateProfileHits(id).subscribe((res: any)=>{
      this.router.navigateByUrl('/candidate/'+id,{replaceUrl:true});

    })
  }


    // filterSearchResults(keyword: string) {
    //   this.candidateProfiles = this.candidateProfiles.filter((element:any) => {
    //     for(const key in element){
    //       if( (element[key]).includes(keyword) ){
    //           console.log(element)
    //         console.log('it exists')
    //       }else {
    //         console.log('does not exist');
    //       }
    //     }
    //   })
    // }



    getAllCandidateProfilesList(){
      // console.log("the recruiter information " +this.RecruiterDetails.id);
      this.candidateService.getAllCandidateProfiles().subscribe(res=>{
        this.candidateProfiles=res
        // console.log(this.candidateProfiles);
        // console.log('it worked');
        
        this.userList = this.candidateProfiles.map((o: { search_label: string; fk_candidate_id: any; first_name: any; last_name: any; email: any; bio: any; certificate: any; city: any; education: any; experience: any; address: { city: any; }; highest_qualification: any; interests: any; job_title: any; phone_number: any; province: any; skills: any; }) => {
          o.search_label =
            ` ${o.fk_candidate_id} ${o.first_name} ${o.last_name} ${o.email} ${o.bio} ${o.certificate} ${o.city} ${o.education} ${o.experience} ${o.city} ${o.highest_qualification} ${o.interests} ${o.job_title} ${o.phone_number} ${o.province} ${o.skills} 
          `
          // console.log(o.search_label);
          
          return o
        });
        // console.log(this.userList)
      })
    }

    

    customSearchFn(term: string, item: any) {
      term = term.toLowerCase();
  
      // Creating and array of space saperated term and removinf the empty values using filter
      let splitTerm = term.split(' ').filter(t => t);
  
      let isWordThere: boolean[] = [];
  
      // Pushing True/False if match is found
      splitTerm.forEach(arr_term => {
        let search = item['search_label'].toLowerCase();
        isWordThere.push(search.indexOf(arr_term) != -1);

      /// searchlebel.includes(arr_tem)


      });
  
      const all_words = (this_word:any) => this_word;
      // Every method will return true if all values are true in isWordThere.
      return isWordThere.every(all_words);
    }
  
    searchCandidate(e: any){
      let searchedProfiles: any [] = []
      searchedProfiles = this.candidateProfiles.filter((candidate: any) => {
        if (candidate.first_name.toLowerCase().includes(e.toLowerCase()) && candidate.last_name.toLowerCase().includes(e.toLowerCase())){
          console.log(candidate);
        }
      })
      console.log(searchedProfiles);
    }
}



