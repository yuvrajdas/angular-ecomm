import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuType: string = 'default';
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        if (event.url.includes('seller') && localStorage.getItem('seller-cred')) {
          this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('seller-cred');
    this.router.navigateByUrl('/');
  }
}
