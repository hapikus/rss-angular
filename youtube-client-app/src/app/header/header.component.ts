import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
    NzTypographyModule,
    NzAnchorModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public searchValue: string = '';
  public sorting: string = 'none';
  public isShow: boolean = false;

  public toggleSettingShow(): void {
    this.isShow = !this.isShow;
  }

  public setSorting(type: string): void {
    this.sorting = type;
  }
}
