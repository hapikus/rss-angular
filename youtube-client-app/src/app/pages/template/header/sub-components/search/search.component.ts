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
import { SearchResponse } from '@models/search.model';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Store } from '@ngrx/store';
import { searchInputChange } from 'src/app/redux/actions/search-input.actions';
import { selectSearchInput } from 'src/app/redux/selectors/search-input.selector';
import { CommonModule } from '@angular/common';
import { selectPage } from 'src/app/redux/selectors/page.selector';
import { Page, PageTokenKey } from 'src/app/redux/state.model';
import { dataFetch, dataUpdate } from 'src/app/redux/actions/data.actions';
import { addPageToken } from 'src/app/redux/actions/page-token.actions';

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

  private setStoreData(searchInput: string): void {
    this.apiService
      .getVideos(searchInput, this.maxResult)
      .subscribe((res: SearchResponse) => {
        if (res) {
          this.store.dispatch(dataFetch({ videoCards: res.items }));
        }

        res.items.forEach((video) => {
          this.apiService
            .getVideoWithDetails(video.id.videoId)
            .subscribe((detailsRes: SearchResponse) => {
              if (detailsRes && detailsRes.items.length > 0) {
                const videoDetail = detailsRes.items[0];
                this.store.dispatch(dataUpdate({ videoCard: videoDetail }));
              }
            });
        });

        if (res.nextPageToken) {
          this.store.dispatch(
            addPageToken({
              pageTokenKey: PageTokenKey.Next,
              token: res.nextPageToken,
            }),
          );
        }
        if (res.prevPageToken) {
          this.store.dispatch(
            addPageToken({
              pageTokenKey: PageTokenKey.Prev,
              token: res.prevPageToken,
            }),
          );
        }
      });
  }

  public search() {
    const searchInput = this.searchForm.value.search ?? '';
    this.setStoreInputSearch(searchInput);
    if (searchInput) {
      this.setStoreData(searchInput);
    }
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private apiService: ApiService,
    private store: Store,
  ) {}
}
