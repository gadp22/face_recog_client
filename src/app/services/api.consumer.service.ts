import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class ApiConsumerService {

  constructor(private http: HttpClient) { }

  public recognize(faceDescriptor :any) {
    let body = {}

    body['faceDescriptor'] = faceDescriptor

    return this.http.post('/recognition', body)
  }

  public getMembers() {
    return this.http.get('/members', {headers : new HttpHeaders({})})
  }

  public getMemberById(id :any) {
    return this.http.get('/members/'+id, {headers : new HttpHeaders({})})
  }

  public registerMember(member :any) {
    let body = {}

    body['member'] = member

    console.log(body)

    //return this.http.post('/members', body)
  }
}

