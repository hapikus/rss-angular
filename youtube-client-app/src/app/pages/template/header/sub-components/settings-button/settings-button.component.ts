import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPage } from 'src/app/redux/selectors/page.selector';
import { Page } from 'src/app/redux/state.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-settings-button',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
  ],
  templateUrl: './settings-button.component.html',
  styleUrl: './settings-button.component.scss',
})
export class SettingsButtonComponent {
  @Output() isSettingShowEmit = new EventEmitter<boolean>();
  public page$ = this.store.select(selectPage);
  public pageEnum = Page;
  public isSettingShow: boolean = false;

  public toggleIsSettingShow(): void {
    this.isSettingShow = !this.isSettingShow;
    this.isSettingShowEmit.emit(this.isSettingShow);
  }

  constructor(private store: Store) {}
}
