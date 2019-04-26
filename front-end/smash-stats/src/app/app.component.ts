import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SmashStats';
  isLoggedIn = false;
  constructor(public authService: AuthService, public router:Router) {
    authService.handleAuthentication();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.authService.renewTokens();
    }
  }

  myStats() {
    let tag = this.authService.getTag();
    this.router.navigate(['/stats/'+tag]);
  }
}
