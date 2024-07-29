import { Component, OnInit } from '@angular/core';
import { store } from '../../stores/store';
import { VideoCard } from '../../models/video-card.model';
import { VideoCardComponent } from './video-card/video-card.component';
import { ItemsService } from '../../services/items.service';
import { Page } from '../../stores/types';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [VideoCardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
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

  public ngOnInit(): void {
    store.page = Page.Main;
  }

  constructor(private itemsService: ItemsService) {}
}
