import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeactivateAccountService {

  private candidateDeactivate ="https://jobberg-server.herokuapp.com/deleteAccount";
  
  // private candidateDeactivate ="http://localhost:4316/deleteAccount";

  constructor(private http: HttpClient) { }

  deactivateAccountById(id:any): Observable<any>{
    return this.http.delete<any>(`${this.candidateDeactivate}/${id}`)
  }

}


