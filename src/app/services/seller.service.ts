import { Injectable } from '@angular/core';
import { login, signUp } from '../interface';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SellerService {

  baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  // seller singup service
  signUp(signUpData: signUp) {
    return this.http.post(`${this.baseUrl}/seller`, signUpData, { observe: 'response' });
  }

  // Checking user is already registered or not
  checkSignUpUser(sellerEmail:string){
    return this.http.get(`${this.baseUrl}/seller?email=${sellerEmail}`,{ observe: 'response' });
  }
  // seller login service
  login(loginData: login) {
    return this.http.get(`${this.baseUrl}/seller?email=${loginData.email}&password=${loginData.password}`, { observe: 'response' });
  }
}
