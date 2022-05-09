import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  private candidaterRegistration ="https://jobberg-server.herokuapp.com/candidate";
  private adminRegistration ="https://jobberg-server.herokuapp.com/admin";
  private recruiterRegistration ="https://jobberg-server.herokuapp.com/recruiter";
  private videoUploader="https://jobberg-server.herokuapp.com/sendVideo";
  private documentUploader="https://jobberg-server.herokuapp.com/sendDocument";
  private resumeUploader="https://jobberg-server.herokuapp.com/sendResume";
  private imageUploader="https://jobberg-server.herokuapp.com/sendPic";
  private resumeUpdater="https://jobberg-server.herokuapp.com/updateResume";
  private videoUpdater="https://jobberg-server.herokuapp.com/updateVideoResume";
  private certificateUpdater="https://jobberg-server.herokuapp.com/updateCertificate";

  // private candidaterRegistration ="http://localhost:4316/candidate";
  // private adminRegistration ="http://localhost:4316/admin";
  // private recruiterRegistration ="http://localhost:4316/recruiter";
  // private videoUploader="http://localhost:4316/sendVideo";
  // private documentUploader="http://localhost:4316/sendDocument";
  // private resumeUploader="http://localhost:4316/sendResume";
  // private imageUploader="http://localhost:4316/sendPic";
  // private resumeUpdater="http://localhost:4316/updateResume";
  // private videoUpdater="http://localhost:4316/updateVideoResume";
  // private certificateUpdater="http://localhost:4316/updateCertificate";

  
  
  
  
  
  registerCandidate(candidate: any): Observable<any>{
    return this.http.post<any>(`${this.candidaterRegistration}`, candidate);
  }

  uploadVideo(videos:any){
    return this.http.post(`${this.videoUploader}`,videos)
  }

  uploadDocument(documents:any){
    return this.http.post(`${this.documentUploader}`,documents)
  }

  uploadResume(resumes:any){
    return this.http.post(`${this.resumeUploader}`,resumes)
  }

  uploadImage(images:any,id:any){
    return this.http.post(`${this.imageUploader}/${id}`,images)
  }

  updateResume(data:any,id:any){
    return this.http.post(`${this.resumeUpdater}/${id}`,data);
  }

  updateVideoResume(data:any,id:any){
    return this.http.post(`${this.videoUpdater}/${id}`,data);
  }

  updateCertificate(data:any,id:any){
    return this.http.post(`${this.certificateUpdater}/${id}`,data);
  }

  registerRecruiter(recruiter:any){
    return this.http.post<any>(`${this.recruiterRegistration}`,recruiter)
  }

  registerAdmin(admin:any){
    return this.http.post<any>(`${this.adminRegistration}`,admin)
  }

  





}
