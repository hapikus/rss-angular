import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { debounceTime, filter } from 'rxjs';
import { store } from '../../../stores/store';
import { Page, SortDirection, SortType, Store } from '../../../stores/types';
import { LoginService } from '../../../services/login.service';
import { ApiService } from '../../../services/api.service';
import { SearchResponse } from '../../../models/search.model';

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
    RouterLink,
    NzInputModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private DEBOUNCE_TIME = 500;
  public store: Store = store;
  public sortTypeButton = [
    SortType.Date,
    SortType.CountOfViews,
    SortType.ByWordOrSentance,
  ];
  public sortDirectionEnum = SortDirection;
  public isSettingShow: boolean = false;
  public sortTypeCurrent = store.sortType;
  public isLogin = this.loginService.isLogin
    .pipe((val) => val)
    .subscribe((val) => val);

  public searchForm: FormGroup<{
    search: FormControl<string>;
  }> = this.fb.group({
    search: ['', [Validators.required]],
  });

  public ngOnInit(): void {
    this.searchForm.controls.search.valueChanges
      .pipe(filter((val) => val.length >= 3))
      .pipe(debounceTime(this.DEBOUNCE_TIME))
      .subscribe(() => this.search());
  }

  public setStoreSearch() {
    store.searchInput = this.searchForm.value.search ?? '';
    if (this.searchForm.value.search) {
      this.router.navigate(['']);
    }
  }

  public getVideos() {
    this.apiService
      .searchVideos(store.searchInput)
      .subscribe((res: SearchResponse) => {
        if (res) {
          store.data = res;
        }
      });
  }

  public search() {
    this.setStoreSearch();
    this.getVideos();
  }

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

  public loginHandle() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  public get loginText() {
    if (this.store.login) {
      const loginName =
        localStorage?.getItem('fakeToken')?.split('-')?.[0] ?? '';
      return loginName;
    }
    return 'Login';
  }

  public checkPage() {
    return store.page !== Page.Main || null;
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private loginService: LoginService,
    private apiService: ApiService,
  ) {}
}
