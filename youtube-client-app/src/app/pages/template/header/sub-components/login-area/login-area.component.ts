import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { LoginService } from '@services/login/login.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-area',
  standalone: true,
  imports: [NzIconModule, NzButtonModule, CommonModule],
  templateUrl: './login-area.component.html',
  styleUrl: './login-area.component.scss',
})
export class LoginAreaComponent implements OnInit {
  public isLogin$: Observable<boolean> = this.loginService.isLogin$;
  public isLoginCurrent = false;

  public ngOnInit(): void {
    this.isLogin$.subscribe((flag) => {
      this.isLoginCurrent = flag;
    });
  }

  public get loginText() {
    if (this.isLoginCurrent) {
      const loginName =
        localStorage?.getItem('fakeToken')?.split('-')?.[0] ?? '';
      return loginName;
    }
    return 'Login';
  }

  public loginHandle() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {}
}
