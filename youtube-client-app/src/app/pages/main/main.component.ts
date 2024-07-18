import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { store } from '../../stores/store';
import { Store } from '../../stores/types';
import { VideoCard } from '../../shared/models/video-card.model';
import { VideoCardComponent } from './video-card/video-card.component';
import { FilterItemsPipe } from './pipes/filter-items.pipe';
import { SortItemsPipe } from './pipes/sort-items.pipe';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, VideoCardComponent, FilterItemsPipe, SortItemsPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  public store: Store = store;
  public search: string = store.searchInput;
  public videoCardSort: VideoCard[] = [];

  public trackById(index: number, item: VideoCard): string {
    return item.id;
  }
}
