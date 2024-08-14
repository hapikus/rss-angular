import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormGroup, FormControl, Validators, NonNullableFormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { filter, debounceTime, Subscription } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Store } from '@ngrx/store';
import { searchInputChange } from 'src/app/redux/actions/search-input.actions';
import { selectSearchInput } from 'src/app/redux/selectors/search-input.selector';
import { CommonModule } from '@angular/common';
import { selectPage } from 'src/app/redux/selectors/page.selector';
import { Page } from 'src/app/redux/state.model';
import { videosFetchFirst } from 'src/app/redux/actions/videos.actions';

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
      .pipe(
        debounceTime(this.DEBOUNCE_TIME),
        filter((val) => val.length >= 3),
      )
      .subscribe(() => this.search());
    this.searchInputSubs = this.searchInput$.subscribe((input) => {
      this.searchInputCurrent = input;
    });
}

  public setStoreInputSearch(searchInput: string): void {
    this.store.dispatch(
      searchInputChange({ input: searchInput }),
    );
    if (searchInput) {
      this.router.navigate(['']);
    }
  }

  public search() {
    const searchInput = this.searchForm.value.search ?? '';
    this.setStoreInputSearch(searchInput);
    if (searchInput) {
      this.store.dispatch(videosFetchFirst());
    }
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private apiService: ApiService,
    private store: Store,
  ) {}
}
