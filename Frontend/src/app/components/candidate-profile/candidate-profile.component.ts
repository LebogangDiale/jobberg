import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent implements OnInit {

  constructor(private router: Router, private candidateService: CandidateService) { }
  

  userRecords = [
    { id: '1', first_name: 'Adam ', last_name: 'Smith', location: 'Pretoria', description: 'Human Resource Business Partner - Brand Management and Sales at LegalWise.', interets:'Gaming', tools:'Adobe Premier Pro',year:'2021', qualification:'Bsc Computer Science', institution:'Tshwane University of Tcehnology', school:'Helmeg Secondary School', subjects: 'Maths and Science' },
    { id: '2', first_name: 'Sarah ', last_name: 'Smith', location: 'Durban', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui venenatis, risus sed tristique. Quam sed erat feugiat lectus volutpat nibh facilisis sodales morbi. Nam malesuada mattis est, tristique posuere adipiscing sem. Maecenas ac pulvinar volutpat, mauris risus suspendisse. Tellus porta morbi praesent enim pulvinar.' },

  ]


  candidate = localStorage.getItem('candidate');
  candidateDetails: any = [];
  candidateSkills:any=[];
  candidateSkillsArray:any=[];
  candidateInterestsArray:any=[];
  candidateInterests:any=[];
  candidateExperienceArray:any=[];
  candidateExperience:any=[];
  candidateEducationArray: any = [];

  ngOnInit(): void {

    if (this.candidate == null) {
      alert("youre not authorized to view this page")
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }
    this.getProfile()

  }

  getProfile() {
    this.candidateDetails = JSON.parse(localStorage.getItem('candidate') || '{}');
    this.candidateService.getCandidateProfile(this.candidateDetails.id).subscribe((res: any) => {
      this.candidateDetails = res;
      console.log(res.id);
      console.log(this.candidateDetails.video_resume);
      
      this.candidateSkills=res.skills;
      this.candidateInterests=res.interests;
      this.candidateExperience=res.experience;
      this.candidateEducationArray=res.education;

      console.log("these are the skills");
  
      console.log(this.candidateSkills);
      this.candidateSkillsArray= this.candidateSkills.split(',');
      console.log(this.candidateSkillsArray);

      console.log(this.candidateInterests);
      this.candidateInterestsArray = this.candidateInterests.split(',');

      console.log(this.candidateExperience);
      this.candidateExperienceArray = this.candidateExperience.split(',');
      
      console.log(this.candidateEducationArray);
      this.candidateEducationArray= this.candidateEducationArray.split(',');


    })

  }

  
  


  getProfile11() {
    this.candidateDetails = JSON.parse(localStorage.getItem('candidate') || '{}');
    this.candidateService.getCandidateProfile(this.candidateDetails.fk_candidate_id).subscribe((res: any) => {
      console.log(res);
      this.candidateDetails = res;
      this.candidateSkills=res.skills;
      this.candidateInterests=res.interests;
      this.candidateExperience=res.experience;
      this.candidateEducationArray=res.education;


      console.log("these are the skills");
  
      console.log(this.candidateSkills);
      this.candidateSkillsArray= this.candidateSkills.split(',');
      console.log(this.candidateSkillsArray);

      console.log(this.candidateInterests);
      this.candidateInterestsArray = this.candidateInterests.split(',');

      console.log(this.candidateExperience);
      this.candidateExperienceArray = this.candidateExperience.split(',');
      
      console.log(this.candidateEducationArray);
      this.candidateEducationArray= this.candidateEducationArray.split(',');

      
      

    })
  }


}

