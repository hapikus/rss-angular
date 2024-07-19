import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { store } from '../../../stores/store';
import { SortDirection, SortType, Store } from '../../../stores/types';
import { LoginService } from '../../../shared/services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    NzTypographyModule,
    NzAnchorModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzRadioModule,
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  private loginService = inject(LoginService);

  public store: Store = store;
  public sortTypeButton = [SortType.Date, SortType.CountOfViews, SortType.ByWordOrSentance];
  public sortDirectionEnum = SortDirection;
  public isSettingShow: boolean = false;
  public sortTypeCurrent = store.sortType;
  public localSearch: string = '';

  public searchForm: FormGroup<{
    search: FormControl<string>;
  }> = this.fb.group({
    search: ['', [Validators.required]],
  });

  public toggleIsSettingShow(): void {
    this.isSettingShow = !this.isSettingShow;
  }

  public setDirection(sortType: SortType): void {
    if (this.sortTypeCurrent !== sortType) {
      this.sortTypeCurrent = sortType;
      store.sortType = sortType;
      store.sortDirection = SortDirection.ASC;
      return;
    }

    store.sortDirection =
      store.sortDirection === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;
  }

  public setStoreSearch() {
    store.searchInput = this.searchForm.value.search ?? '';
    const searchEmpty = !this.searchForm.value.search;
    if (!searchEmpty) {
      this.router.navigate(['']);
    }
  }

  public loginHandle() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  constructor(private fb: NonNullableFormBuilder) {}
}
