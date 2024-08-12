import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzImageModule } from 'ng-zorro-antd/image';
import { Page } from '@stores/types';
import { store } from '@stores/store';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NzImageModule, NzButtonModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent implements OnInit {
  public ngOnInit(): void {
    store.page = Page.NotFound;
  }
}
