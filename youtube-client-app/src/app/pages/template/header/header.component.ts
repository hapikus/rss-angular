import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { store } from '@stores/store';
import { Page, Store } from '@stores/types';
import { LoginService } from '@services/login/login.service';
import { SettingsComponent } from './sub-components/settings/settings.component';
import { LoginAreaComponent } from './sub-components/login-area/login-area.component';
import { SearchComponent } from './sub-components/search/search.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzButtonModule,
    NzIconModule,
    CommonModule,
    RouterLink,
    SettingsComponent,
    LoginAreaComponent,
    SearchComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public store: Store = store;
  public isSettingShow: boolean = false;
  public isLogin: boolean = false;

  public ngOnInit(): void {
    this.loginService.isLogin$
      .subscribe((val) => {
        this.isLogin = val;
      });
  }

  public isSettingShowEmit($event: boolean): void {
    this.isSettingShow = $event;
  }

  public checkPage() {
    return store.page !== Page.Main || null;
  }

  constructor(
    private loginService: LoginService,
  ) {}
}
