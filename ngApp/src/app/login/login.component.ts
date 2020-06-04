import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData = {};

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  loginUser() {
    // console.log(this.loginUserData);
    this.authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/special']);
      },
      err => console.log(err)
    );
  }
}
