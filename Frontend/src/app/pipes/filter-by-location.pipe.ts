import { Pipe, PipeTransform } from '@angular/core';
import { CandidateresultsComponent } from '../components/candidateresults/candidateresults.component';

@Pipe({
  name: 'filterByLocation'
})
export class FilterByLocationPipe implements PipeTransform {

  transform(candidateDetails:any[],filterTest: string){
    if(candidateDetails.length === 0 || filterTest === '' )
    {
      console.log(candidateDetails);
      console.log(filterTest);
      
        return candidateDetails; 
    }
     else 
     {
        return candidateDetails.filter((user) =>
        {return user.province?.toLowerCase() === filterTest?.toLowerCase()})
     }
 }

}
