import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IsignUpFrom } from '../interface';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent {
  sellerSignUp!: FormGroup;
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private ss: SellerService, private router: Router) { }

  ngOnInit() {
    this.sellerSignUp = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.sellerReloadChecking();
  }

  // checking seller if already logged in the redirecting to seller home component
  sellerReloadChecking(){
    if(localStorage.getItem('seller-cred')){
      this.router.navigateByUrl('seller-home');
    }
  }

  // Seller SignUp form submission
  submitSellerSingUPForm(seller: IsignUpFrom) {
    this.ss.userSignUp(seller).subscribe((res) => {
      if (res) {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller-cred', 'demo-jwt-token');
        this.router.navigateByUrl('seller-home');
      }
    })
    this.sellerSignUp.reset();
  }



}
 