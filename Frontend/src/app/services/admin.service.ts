import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private getUsers="https://jobberg-server.herokuapp.com/users";
  private getActUsers="https://jobberg-server.herokuapp.com/users/activeUsers";
  private getNonActUsers="https://jobberg-server.herokuapp.com/users/nonActiveUsers";
  private getAdmins="https://jobberg-server.herokuapp.com/admin";
  private removeAccountById="https://jobberg-server.herokuapp.com/removeUserById";
  private activeUserById="https://jobberg-server.herokuapp.com/activeUserById";
  private getAccountById="https://jobberg-server.herokuapp.com/userById";
  private sendFeedbackUrl="https://jobberg-server.herokuapp.com/sendFeedback";

  // private getUsers="http://localhost:4316/users";
  // private getActUsers="http://localhost:4316/users/activeUsers";
  // private getNonActUsers="http://localhost:4316/users/nonActiveUsers";
  // private getAdmins="http://localhost:4316/admin";
  // private removeAccountById="http://localhost:4316/removeUserById";
  // private activeUserById="http://localhost:4316/activeUserById";
  // private getAccountById="http://localhost:4316/userById";
  // private sendFeedbackUrl="http://localhost:4316/sendFeedback";
  

  constructor(private http:HttpClient) { }

  getusers(){
    return this.http.get<any>(`${this.getUsers}`)
  }

  getActiveUsers(): Observable<any>{
    return this.http.get<any>(`${this.getActUsers}`);
  }

  getNonActiveUsers(): Observable<any>{
    return this.http.get<any>(`${this.getNonActUsers}`);
  }

  getActAdmins(): Observable<any>{
    return this.http.get<any>(`${this.getAdmins}`)

  }

  removeUserById(id:any): Observable<any>{
    return this.http.delete<any>(`${this.removeAccountById}/${id}`)
  }


  activateUserByd(id:any): Observable<any>{
    return this.http.delete<any>(`${this.activeUserById}/${id}`)
  }

  getUserById(id:any): Observable<any>{
    return this.http.get<any>(`${this.getAccountById}/${id}`)
  }

  sendFeed(feed:any){
    return this.http.post<any>(`${this.sendFeedbackUrl}`,feed)
  }

}
