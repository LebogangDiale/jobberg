import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private getCandidateProfileById ="https://jobberg-server.herokuapp.com/candidate/profile";
  private getActiveCandidates="https://jobberg-server.herokuapp.com/candidates";
  private getCandidateProfiles="https://jobberg-server.herokuapp.com/getAllProfiles"
  private getCandidateProfilesByShortList="https://jobberg-server.herokuapp.com/getAllProfilesShortList";
  private hits="https://jobberg-server.herokuapp.com/hits";
  private updateCandidateProfileById="https://jobberg-server.herokuapp.com/candidateProfile";

  // private getCandidateProfileById ="http://localhost:4316/candidate/profile";
  // private getActiveCandidates="http://localhost:4316/candidates";
  // private getCandidateProfiles="http://localhost:4316/getAllProfiles";
  // private getCandidateProfilesByShortList="http://localhost:4316/getAllProfilesShortList";
  // private hits="http://localhost:4316/hits";
  // private updateCandidateProfileById="http://localhost:4316/candidateProfile";


  constructor(private http: HttpClient) { }

  
  getCandidateProfile(id: any): Observable<any> {
    return this.http.get<any>(`${this.getCandidateProfileById}/${id}`);
  }

  

  getCandidates():Observable<any>{
    return this.http.get<any>(`${this.getActiveCandidates}`);
  }

  getAllCandidateProfiles():Observable<any>{
    return this.http.get<any>(`${this.getCandidateProfiles}`);
  }

  getCandidateShortList():Observable<any>{
    return this.http.get<any>(`${this.getCandidateProfilesByShortList}`);
  }

  getProfileHits(id: any): Observable<any> {
    return this.http.get<any>(`${this.hits}/${id}`);
  }

  updateProfileHits(id: any): Observable<any> {
    return this.http.put<any>(`${this.hits}/${id}`,id);
  }
   
  updateCandidateProfile(id: any,data:any): Observable<any> {
    return this.http.put<any>(`${this.updateCandidateProfileById}/${id}`,data);
  }


  // Pagination
  getUsers(page: number){
    return this.http.get(this.getCandidateProfiles  + '?page=' + page);
  }

}