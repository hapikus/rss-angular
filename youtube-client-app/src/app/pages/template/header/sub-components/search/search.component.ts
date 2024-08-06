import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormGroup, FormControl, Validators, NonNullableFormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { filter, debounceTime, Subscription } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { SearchResponse } from '@models/search.model';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Store } from '@ngrx/store';
import { searchInputChange } from 'src/app/redux/actions/search-input.actions';
import { selectSearchInput } from 'src/app/redux/selectors/search-input.selector';
import { CommonModule } from '@angular/common';
import { selectPage } from 'src/app/redux/selectors/page.selector';
import { Page } from 'src/app/redux/state.model';
import { dataFetch } from 'src/app/redux/actions/data.actions';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzRadioModule,
    NzFormModule,
    ReactiveFormsModule,
    RouterLink,
    NzSelectModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  @Output() isSettingShowEmit = new EventEmitter<boolean>();
  public page$ = this.store.select(selectPage);
  public pageEnum = Page;

  public searchInputSubs?: Subscription;
  public searchInput$ = this.store.select(selectSearchInput);
  public searchInputCurrent = '';

  private DEBOUNCE_TIME = 500;
  public isSettingShow: boolean = false;
  public maxResult: string = '8';

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
    this.searchInputSubs = this.searchInput$.subscribe((input) => {
      this.searchInputCurrent = input;
    });
}

  public toggleIsSettingShow(): void {
    this.isSettingShow = !this.isSettingShow;
    this.isSettingShowEmit.emit(this.isSettingShow);
  }

  public setStoreInputSearch(): void {
    this.store.dispatch(
      searchInputChange({ input: this.searchForm.value.search ?? '' }),
    );
    if (this.searchForm.value.search) {
      this.router.navigate(['']);
    }
  }

  private setStoreData(): void {
    if (!this.searchForm.value.search) {
      return;
    }
    this.apiService
      .getVideos(this.searchInputCurrent, this.maxResult)
      .subscribe((res: SearchResponse) => {
        if (res) {
          this.store.dispatch(dataFetch({ videoCards: res.items }));
        }
      });
  }

  public search() {
    this.setStoreInputSearch();
    this.setStoreData();
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private apiService: ApiService,
    private store: Store,
  ) {}
}
