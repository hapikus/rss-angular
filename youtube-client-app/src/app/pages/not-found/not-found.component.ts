import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzImageModule } from 'ng-zorro-antd/image';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { Page } from 'src/app/redux/state.model';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NzImageModule, NzButtonModule, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent implements OnInit {
  public ngOnInit(): void {
    this.store.dispatch(pageChange({ page: Page.NotFound }));
  }

  constructor(private store: Store) {}
}
