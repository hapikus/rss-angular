import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';
import { Store } from '@stores/types';
import { store } from '@stores/store';
import { LoginService } from '@services/login/login.service';

@Component({
  selector: 'app-login-area',
  standalone: true,
  imports: [NzIconModule, NzButtonModule],
  templateUrl: './login-area.component.html',
  styleUrl: './login-area.component.scss',
})
export class LoginAreaComponent {
  public store: Store = store;

  public get loginText() {
    if (this.store.login) {
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
