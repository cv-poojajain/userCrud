import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserModel } from './model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiURL = "https://mocki.io/v1/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.apiURL + 'caa1715a-c5b6-4814-be44-009b19565bba')
  }

  create(user: UserModel) {
    console.log(JSON.stringify(user));
    return this.http.post(this.apiURL + 'caa1715a-c5b6-4814-be44-009b19565bba/', JSON.stringify(user), this.httpOptions)

    .pipe(
     // console.log();
      catchError(this.errorHandler)
    )
  }

  update(id:number, user: UserModel){

    return this.http.put(this.apiURL + 'caa1715a-c5b6-4814-be44-009b19565bba/' + id, JSON.stringify(user), this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.http.delete(this.apiURL + 'caa1715a-c5b6-4814-be44-009b19565bba/' + id, this.httpOptions)

    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any) {
    console.log(error);
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
