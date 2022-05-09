import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.scss']
})
export class ViewCandidateComponent implements OnInit {

  recruiter=localStorage.getItem('recruiter');

  constructor(private route: ActivatedRoute, private candidateService: CandidateService) { }

  id = this.route.snapshot.params['id'];
  candidateEducationArray: any = [];
  candidateDetails: any = [];
  candidateSkills:any=[];
  candidateSkillsArray:any=[];
  candidateInterestsArray:any=[];
  candidateInterests:any=[];
  candidateExperienceArray:any=[];
  candidateExperience:any=[];

  ngOnInit(): void {
    console.log(this.id);
    this.getProfile();
   
  }


  getProfile() {
    this.candidateService.getCandidateProfile(this.id).subscribe((res: any) => {
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
