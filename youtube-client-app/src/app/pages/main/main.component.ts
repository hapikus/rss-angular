import { Component, inject } from '@angular/core';
import { store } from '../../stores/store';
import { Store } from '../../stores/types';
import { VideoCard } from '../../shared/models/video-card.model';
import { VideoCardComponent } from './video-card/video-card.component';
import { ItemsService } from '../../shared/services/items.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [VideoCardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public store: Store = store;
  private itemsService = inject(ItemsService);

  public get items(): VideoCard[] {
    const filtredItems = this.itemsService.getFiltredItems(store.searchInput);
    const sortedItems = this.itemsService.getSortedItems(
      filtredItems,
      store.sortType,
      store.sortDirection,
      store.sortInput,
    );
    return sortedItems;
  }
}
