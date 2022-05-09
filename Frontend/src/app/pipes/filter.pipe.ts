import { Pipe, PipeTransform } from '@angular/core';
import { CandidateresultsComponent } from '../components/candidateresults/candidateresults.component';


@Pipe({
  name: 'filterCandidates'
})
export class FilterPipe implements PipeTransform {

  transform(candidateDetails:any[],filterText: string){
     if(candidateDetails.length === 0 || filterText === '' )
     {
         return candidateDetails; 
     }
      else 
      {
         return candidateDetails.filter((user) =>
         {return user.highest_qualification?.toLowerCase() === filterText?.toLowerCase()})
      }
  }

}
