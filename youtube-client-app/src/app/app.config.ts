import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { routes } from './app.routes';
import { keyInterceptor } from './interceptor/key-interceptor';

import { sortTypeReducer } from './redux/reducers/sort-type.reducer';
import { sortDirectionReducer } from './redux/reducers/sort-direction.reducer';
import { searchInputReducer } from './redux/reducers/search-input.reducer';
import { sortInputReducer } from './redux/reducers/sort-input.reducer';
import { pageReducer } from './redux/reducers/page.reducer';
import { dataReducer } from './redux/reducers/data.reducer';
import { favoritesReducer } from './redux/reducers/favorites.reducer';
import { customCardsReducer } from './redux/reducers/custom-card.reducer';
import { pageTokenReducer } from './redux/reducers/page-token.reducer';
import { pageNumberReducer } from './redux/reducers/page-number.reducer';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzI18n(en_US),
    provideHttpClient(withInterceptors([keyInterceptor])),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideStore({
      sortType: sortTypeReducer,
      sortDirection: sortDirectionReducer,
      sortInput: sortInputReducer,
      page: pageReducer,
      searchInput: searchInputReducer,
      data: dataReducer,
      favorites: favoritesReducer,
      customCards: customCardsReducer,
      pageToken: pageTokenReducer,
      pageNumber: pageNumberReducer,
    }),
    provideEffects(),
    provideRouterStore(),
],
};
