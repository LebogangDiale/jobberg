import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCulture'
})
export class FilterByCulturePipe implements PipeTransform {

  transform(candidateDetails:any[],filterText: string){
    if(candidateDetails.length === 0 || filterText === '' )
    {
        return candidateDetails; 
    }
     else 
     {
        return candidateDetails.filter((user) =>
        {return user.culture?.toLowerCase() === filterText?.toLowerCase()})
     }
 }

}
