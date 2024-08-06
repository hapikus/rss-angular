import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginService } from '@services/login/login.service';
import { Observable } from 'rxjs';
import { selectPage } from 'src/app/redux/selectors/page.selector';
import { Store } from '@ngrx/store';
import { Page } from 'src/app/redux/state.model';
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
export class HeaderComponent {
  public page$ = this.store.select(selectPage);
  public pageEnum = Page;

  public isSettingShow: boolean = false;
  public isLogin$: Observable<boolean> = this.loginService.isLogin$;

  public isSettingShowEmit($event: boolean): void {
    this.isSettingShow = $event;
  }

  constructor(
    private loginService: LoginService,
    private store: Store,
  ) {}
}
