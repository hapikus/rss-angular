import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { store } from '../../stores/store';
import { Store } from '../../stores/types';
import { VideoCard } from './video-card/video-card.model';
import { VideoCardComponent } from './video-card/video-card.component';
import { VideoCardSortPipe } from '../../pipes/video-card-sort.pipe';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, VideoCardComponent, VideoCardSortPipe],
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
