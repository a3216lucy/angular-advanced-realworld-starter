import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginInfo } from '../interfaces/login-info';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  /**
   * 帳號 demo@miniasp.com
   * 密碼 123456
   */
  user: UserLoginInfo = {
    email: '',
    password: '',
  };

  redirectUrl = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService // private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParamMap) => {
      // queryParamMap 是抓查詢字串，也就是 ?後面的那些字串
      // paramsMap 是抓路徑參數，也就是 / 後面的那些字串（舉例 :id）
      this.redirectUrl = queryParamMap.get('redirect') || '';
    });
  }

  login() {
    this.loginService.login(this.user).subscribe({
      // 可以有三個事件
      // 1. next
      next: (res) => {
        localStorage.setItem('token', res.user.token);
        // this.router.navigate(['/']);
        this.router.navigateByUrl(this.redirectUrl ?? '/');
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
