import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { Page } from 'src/app/redux/state.model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CommonModule } from '@angular/common';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { FavoritesComponent } from './favorites.component';

const favoritesMock = [{ id: '1', title: 'Favorite 1' }];

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let store: MockStore;
  const initialState = { favorites: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NzImageModule,
        NzTypographyModule,
        FavoritesComponent,
      ],
      providers: [
        provideMockStore({ initialState }),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch pageChange on initialization', () => {
    const action = pageChange({ page: Page.Favorites });
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('should select favorites from the store', () => {
    const favorites = favoritesMock;
    jest.spyOn(store, 'select').mockReturnValue(of(favorites));

    component.favoritesData$.subscribe((data) => {
      expect(data).toEqual(favorites);
    });
  });
});
