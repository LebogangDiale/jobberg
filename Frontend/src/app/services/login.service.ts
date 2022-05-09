import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl ="https://jobberg-server.herokuapp.com/login";
  private forgotPass = "https://jobberg-server.herokuapp.com/forgotPassword";
  private updatePasswordUrl = "https://jobberg-server.herokuapp.com/updatePassword";

  // private loginUrl ="http://localhost:4316/login";
  // private forgotPass = "http://localhost:4316/forgotPassword";
  // private updatePasswordUrl = "http://localhost:4316/updatePassword";

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post(`${this.loginUrl}`, data);
  }

  forgotPassword(email: any): Observable<any> {
    return this.http.patch(`${this.forgotPass}`, email);
  }

  updatePassword(user:any): Observable<any> {
    return this.http.post(`${this.updatePasswordUrl}`, user);
  }

  

}
