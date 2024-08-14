import { Component, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Store } from '@ngrx/store';
import { Card } from '@models/video-card.model';
import { addFavorite, removeFavorite } from 'src/app/redux/actions/favorites.actions';
import { removeCustomCard } from 'src/app/redux/actions/custom-card.actions';
import { CommonModule } from '@angular/common';
import { CardType } from '../cards/types';

@Component({
  selector: 'app-card-action',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, CommonModule],
  templateUrl: './card-action.component.html',
  styleUrl: './card-action.component.scss',
})
export class CardActionComponent {
  @Input() public card?: Card;
  @Input() public isFavorite?: boolean | null;

  public cardTypeEnum = CardType;

  constructor(private store: Store) {}

  public addFavorite() {
    if (this.card) {
      this.store.dispatch(
        addFavorite({
          favoriteCard: {
            id: this.card.id,
            title: this.card.title ?? '',
            video: '',
            description: this.card.description ?? '',
            previewImage: this.card.previewUrl ?? '',
            createDate: this.card.publishDate ?? new Date(),
            statistics: this.card.statistics,
          },
        }),
      );
    }
  }

  public removeFavorite() {
    if (this.card) {
      this.store.dispatch(removeFavorite({ id: this.card.id }));
    }
  }

  public removeCustomCard() {
    this.store.dispatch(removeCustomCard({ index: +(this.card?.id ?? 0) }));
  }

  public clickHandle() {
    switch (this.card?.cardType) {
      case CardType.CustomCard:
        this.removeCustomCard();
        break;
      case CardType.FavoriteCard:
      case CardType.YouTube:
        if (this.isFavorite) {
          this.removeFavorite();
          break;
        }
        this.addFavorite();
        break;
      default:
        break;
    }
  }
}
