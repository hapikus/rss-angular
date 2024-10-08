import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { ErrorsFormatterPipe } from '@shared/pipes/errors-formatter.pipe';
import { Store } from '@ngrx/store';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { Page } from 'src/app/redux/state.model';
import { addCustomCard } from 'src/app/redux/actions/custom-card.actions';
import { descriptionValidator, previewImageValidator, titleValidator, videoValidator } from './helpers';

const MAX_TAGS = 5;

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzIconModule,
    ErrorsFormatterPipe,
    CommonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  public maxTags = MAX_TAGS;
  public formArray = new FormArray<FormControl<string | null>>([]);

  constructor(private fb: FormBuilder, private store: Store) {}

  public createCardForm = this.fb.group({
    title: ['', [Validators.required, titleValidator()]],
    description: ['', descriptionValidator()],
    previewImage: ['', [Validators.required, previewImageValidator()]],
    video: ['', [Validators.required, videoValidator()]],
    createDate: this.fb.control<Date | null>(null, [Validators.required]),
    tags: this.formArray,
  });

  public ngOnInit(): void {
    this.store.dispatch(pageChange({ page: Page.Admin }));
  }

  public disabledDates(date: Date) {
    return date.getTime() > new Date().getTime();
  }

  public addTag(e?: MouseEvent): void {
    e?.preventDefault();
    const newControl = new FormControl('', [Validators.required]);
    this.formArray.push(newControl);
  }

  public removeTag(i: number, e: MouseEvent): void {
    e.preventDefault();
    this.formArray.removeAt(i);
  }

  public trackByFn(index: number): string {
    return index.toString();
  }

  public reset() {
    this.createCardForm.reset();
  }

  public submit() {
    const customCard = {
      title: this.createCardForm.get(['title'])?.value ?? '',
      description: this.createCardForm.get(['description'])?.value ?? '',
      previewImage: this.createCardForm.get(['previewImage'])?.value ?? '',
      video: this.createCardForm.get(['video'])?.value ?? '',
      createDate: this.createCardForm.get(['createDate'])?.value ?? new Date(),
      tags: this.createCardForm.get(['tags'])?.value ?? [],
    };
    this.store.dispatch(addCustomCard({ customCard }));
    this.createCardForm.reset();
  }
}
