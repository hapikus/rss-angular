import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoginService } from '@services/login/login.service';
import { selectPage } from 'src/app/redux/selectors/page.selector';
import { Store } from '@ngrx/store';
import { Page } from 'src/app/redux/state.model';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { selectFavoriteCount } from 'src/app/redux/selectors/favorites.selector';
import { toSignal } from '@angular/core/rxjs-interop';
import { SettingsComponent } from './sub-components/settings/settings.component';
import { LoginAreaComponent } from './sub-components/login-area/login-area.component';
import { SearchComponent } from './sub-components/search/search.component';
import { SettingsButtonComponent } from './sub-components/settings-button/settings-button.component';

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
    NzBadgeModule,
    SettingsButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public pageSignal = toSignal(this.store.select(selectPage));
  public pageEnum = Page;

  public isSettingShow: boolean = false;
  public isLoginSignal = this.loginService.isLoginSignal;

  public favoritesLength$ = this.store.select(selectFavoriteCount);
  public favoritesLength = 0;

  public isSettingShowEmit($event: boolean): void {
    this.isSettingShow = $event;
  }

  constructor(
    private loginService: LoginService,
    private store: Store,
  ) {}
}
