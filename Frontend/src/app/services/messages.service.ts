import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private getMsgUrl ="http://localhost:4316/message/getMessages";
  private sendMsgUrl ="http://localhost:4316/message/sendMessage";

  constructor(private http: HttpClient) { }

  getMessages(data: any): Observable<any> {
    return this.http.get(`${this.getMsgUrl}`, data);
  }

  sendMessage(data: any): Observable<any> {
    return this.http.post(`${this.sendMsgUrl}`, data);
  }


}
