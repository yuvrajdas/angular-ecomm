import { Injectable } from '@angular/core';
import { IsignUpFrom } from '../interface';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  
  userSignUp(signUpData: IsignUpFrom) {
    return this.http.post(`${this.baseUrl}/seller`, signUpData);
  }
}
