import { Component, Input } from '@angular/core';
import { Card, VideoCard } from '@models/video-card.model';
import { CustomCard, FavoriteCard } from 'src/app/redux/state.model';
import { CommonModule } from '@angular/common';
import { VideoCardComponent } from './video-card/video-card.component';
import { CardType } from './types';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [VideoCardComponent, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  @Input() public videoCards?: VideoCard[] = [];
  @Input() public favoriteCards?: FavoriteCard[];
  @Input() public customCards?: CustomCard[] = [];

  public cardTypeEnum = CardType;

  public get items(): Card[] {
    const cards: Card[] = [];
    (this.videoCards ?? []).map((videoCard) => (
      cards.push({
        title: videoCard.snippet.title,
        statistics: videoCard.statistics,
        previewUrl: videoCard.snippet.thumbnails['medium'].url,
        description: videoCard.snippet.description,
        publishDate: videoCard.snippet.publishedAt,
        id: videoCard.id.videoId,
        cardType: CardType.YouTube,
      })
    ));
    (this.favoriteCards ?? []).map((favoriteCard) => (
      cards.push({
        title: favoriteCard.title,
        statistics: favoriteCard.statistics,
        previewUrl: favoriteCard.previewImage,
        description: favoriteCard.description,
        publishDate: favoriteCard.createDate,
        id: favoriteCard.id,
        cardType: CardType.FavoriteCard,
      })
    ));
    (this.customCards ?? []).map((customCards, index) => (
      cards.push({
        title: customCards.title,
        previewUrl: customCards.previewImage,
        description: customCards.description,
        publishDate: customCards.createDate,
        id: `${index}`,
        cardType: CardType.CustomCard,
      })
    ));
    return cards;
  }
}
