import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardsComponent } from '@shared/components/cards/cards.component';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { Page } from 'src/app/redux/state.model';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { selectFavorites } from 'src/app/redux/selectors/favorites.selector';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, CardsComponent, NzImageModule, NzTypographyModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  public favoritesData$ = this.store.select(selectFavorites);

  public ngOnInit(): void {
    this.store.dispatch(pageChange({ page: Page.Favorites }));
  }

  constructor(private store: Store) {}
}
