import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormGroup, FormControl, Validators, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { filter, debounceTime } from 'rxjs';
import { Page, Store } from '@stores/types';
import { store } from '@stores/store';
import { ApiService } from '@services/api/api.service';
import { SearchResponse } from '@models/search.model';

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
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  @Output() isSettingShowEmit = new EventEmitter<boolean>();

  private DEBOUNCE_TIME = 500;
  public isSettingShow: boolean = false;
  public store: Store = store;

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

  public checkPage(): boolean | null {
    return store.page !== Page.Main || null;
  }

  public toggleIsSettingShow(): void {
    this.isSettingShow = !this.isSettingShow;
    this.isSettingShowEmit.emit(this.isSettingShow);
  }

  public setStoreSearch(): void {
    store.searchInput = this.searchForm.value.search ?? '';
    if (this.searchForm.value.search) {
      this.router.navigate(['']);
    }
  }

  private getVideos(): void {
    this.apiService
      .getVideos(store.searchInput)
      .subscribe((res: SearchResponse) => {
        if (res) {
          store.data = res.items;
        }
      });
  }

  public search() {
    this.setStoreSearch();
    this.getVideos();
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private apiService: ApiService,
  ) {}
}
