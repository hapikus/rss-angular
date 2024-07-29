import { Component } from '@angular/core';
import { store } from '../../stores/store';
import { Store } from '../../stores/types';
import { VideoCard } from '../../models/video-card.model';
import { VideoCardComponent } from './video-card/video-card.component';
import { ItemsService } from '../../services/items.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [VideoCardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public store: Store = store;

  public get items(): VideoCard[] {
    const filtredItems = this.itemsService.getFiltredItems(store.searchInput);
    const sortedItems = this.itemsService.getSortedItems({
      cards: filtredItems,
      sortType: store.sortType,
      sortDirection: store.sortDirection,
      sortInput: store.sortInput,
    });
    return sortedItems;
  }

  constructor(private itemsService: ItemsService) {}
}
