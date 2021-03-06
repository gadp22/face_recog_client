import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ApiConsumerService {

  constructor(private http: HttpClient) { }

  url :string = ''

  public recognize(faceDescriptor :any) {
    let body = {}

    body['faceDescriptor'] = faceDescriptor

    return this.http.post(this.url+'/recognition', body)
  }

  public getMembers() {
    return this.http.get(this.url+'/members', {headers : new HttpHeaders({})})
  }

  public getMemberById(id :any) {
    return this.http.get(this.url+'/members/'+id, {headers : new HttpHeaders({})})
  }

  public registerMember(member :any) {
    let body = {}

    body['member'] = member

    console.log(body)

    //return this.http.post('/members', body)
  }

  public rightAnswer() {
    return this.http.get(this.url+'/answeryes', {headers : new HttpHeaders({})})
  }
  
  public wrongAnswer() {
    return this.http.get(this.url+'/answerno', {headers : new HttpHeaders({})})
  }

  public getRightAnswer() {
    return this.http.get(this.url+'/answeryescount', {headers : new HttpHeaders({})})
  }

  public getWrongAnswer() {
    return this.http.get(this.url+'/answernocount', {headers : new HttpHeaders({})})
  }

  public getAttendanceList() {
    return this.http.get(this.url+'/attendances', {headers : new HttpHeaders({})})
  }
}

