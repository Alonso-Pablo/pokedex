import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  user: User = {
    name: '',
    nickname: '',
    team: 'yellow',
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
  ) {
    this.isAuthenticated = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe(isUserAuth => {
      this.isAuthenticated = isUserAuth;
      if (isUserAuth) {
        this.userService.findMe().subscribe((user: User) => this.user = user)
      }
    })
  }

  handleLogOut() {
    this.authService.endSession()
    this.isAuthenticated = false
    this.router.navigate(['/login'])
  }


}
