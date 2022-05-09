import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {


  private getRecruiters ="https://jobberg-server.herokuapp.com/recruiter";
  private shortListCandidate = "https://jobberg-server.herokuapp.com/recruiter/shortlist"

  // private getRecruiters ="http://localhost:4316/recruiter";
  // private shortListCandidate = "http://localhost:4316/recruiter/shortlist"

  constructor(private http: HttpClient) { }

  getActRecruiters(): Observable<any>{
    return this.http.get<any>(`${this.getRecruiters}`);
  }

  getRecruiterById(id:any): Observable<any>{
    return this.http.get<any>(`${this.getRecruiters}/${id}`);
  }

  addToShortList(data:any): Observable<any>{
    return this.http.post(`${this.shortListCandidate}`,data)
  }

  getShortListedCandidates(id:any): Observable<any>{
    return this.http.get(`${this.shortListCandidate}/${id}`)
  }


  removedListedCandidates(id:any,fk_candidate_id:any): Observable<any>{
    console.log("fkcid",fk_candidate_id);
    var httpParams = {'fk_candidate_id': `${fk_candidate_id}`};
    return this.http.delete(`${this.shortListCandidate}/${id}`,{params:httpParams})
  }
  

}
