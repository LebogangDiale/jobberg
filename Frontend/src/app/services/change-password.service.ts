import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  
  private changePassword ="https://jobberg-server.herokuapp.com/updatePassword";

  // private changePassword ="http://localhost:4316/updatePassword";

  constructor(private http: HttpClient) { }

  changePasswordById(id:any, data:any): Observable<any>{
    return this.http.patch<any>(`${this.changePassword}/${id}`, data)
  }
}
