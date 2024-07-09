import { Component, DoCheck } from '@angular/core';
import { store } from '../../stores/store';
import { Store } from '../../stores/types';
import { VideoCard } from './video-card/video-card.model';
import { VideoCardComponent } from './video-card/video-card.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [VideoCardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements DoCheck {
  public store: Store = store;
  public search: string = store.searchInput;
  public videoCardSort: VideoCard[] = [];

  public ngDoCheck(): void {
    if (store.searchInput !== this.search) {
      this.search = store.searchInput;
      this.videoCardSort = store
        .mockData.items
        .filter((item) => item.snippet.title.includes(this.search));
    }
  }
}
