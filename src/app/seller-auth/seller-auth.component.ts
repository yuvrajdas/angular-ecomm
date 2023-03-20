import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { signUp, login } from '../interface';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent {
  sellersignUp!: FormGroup;
  sellerLogin!: FormGroup;
  isLoginError: string = '';
  isExistingUser: string = '';
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  showLoginForm: boolean = false;
  constructor(private ss: SellerService, private router: Router) { }

  ngOnInit() {
    this.sellersignUp = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.sellerLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
    this.sellerReloadChecking();
  }

  // checking seller if already logged in the redirecting to seller home component
  sellerReloadChecking() {
    if (localStorage.getItem('seller-cred')) {
      this.router.navigateByUrl('seller-home');
    }
  }

  // Seller signUp form submission
  sellerSingUpForm(seller: signUp) {

    // Checking the user is already registered or not
    this.ss.checkSignUpUser(seller.email).subscribe((res: any) => {
      if (res.body.length) {
        this.isExistingUser = 'User is already registered';
        setTimeout(() => {
          this.isExistingUser = '';
        }, 5000);
        console.log(res.body[0].email, seller.email);
        return;
      } else {
        this.ss.signUp(seller).subscribe((res: any) => {
          if (res.body) {
            this.isSellerLoggedIn.next(true);
            localStorage.setItem('seller-cred', res.body[0].email);
            this.router.navigateByUrl('seller-home');
          }
        })
      }
    })
    this.sellersignUp.reset();
  }

  // Seller login form submission
  sellerLoginForm(seller: login) {
    this.ss.login(seller).subscribe((res: any) => {
      if (res.body.length) {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller-cred', res.body[0].email);
        this.router.navigateByUrl('seller-home');
      } else {
        this.isLoginError = 'Invalid Credentials! Please try again...';
        setTimeout(() => {
          this.isLoginError = '';
        }, 5000);
      }
    })
  }

  // if user alredy signed up then showing login form
  goToLoginForm() {
    this.showLoginForm = true;
  }

  // if user dont signed up then showing signUp form
  goTosignUpForm() {
    this.showLoginForm = false;
  }

}
