import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginInfo } from '../interfaces/login-info';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  /**
   * 帳號 demo@miniasp.com
   * 密碼 123456
   */
  user: UserLoginInfo = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private loginService: LoginService // private fb: FormBuilder
  ) {}

  login() {
    this.loginService.login(this.user).subscribe({
      // 可以有三個事件
      // 1. next
      next: (res) => {
        localStorage.setItem('token', res.user.token);
        // this.router.navigate(['/']);
        this.router.navigateByUrl('/');
      },
      // 2. error
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      // 3. complete
      complete: () => {},
    });
  }
}
