import { Component, Input } from '@angular/core';
import { VideoCard } from '@models/video-card.model';
import { CustomCard, FavoriteCard } from 'src/app/redux/state.model';
import { VideoCardComponent } from './video-card/video-card.component';
import { CardType } from './types';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [VideoCardComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  @Input() public items?: VideoCard[] = [];
  @Input() public favoriteCards?: FavoriteCard[];
  @Input() public customCards?: CustomCard[] = [];

  public cardTypeEnum = CardType;
}
