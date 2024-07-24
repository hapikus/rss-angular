import { Component } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { descriptionValidator, previewImageValidator, titleValidator, videoValidator } from './helpers';
import { ErrorsFormatterPipe } from '../../shared/pipes/errors-formatter.pipe';

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
export class AdminComponent {
  public MAX_TAGS = 5;
  public createCardForm = this.fb.group({
    title: ['', [Validators.required, titleValidator()]],
    description: ['', descriptionValidator()],
    previewImage: ['', [Validators.required, previewImageValidator()]],
    video: ['', [Validators.required, videoValidator()]],
    createDate: this.fb.control<Date | null>(null, [Validators.required]),
    tags: this.fb.array<FormGroup<{ tag: FormControl<string | null> }>>([]),
  });

  public disabledDates(date: Date) {
    return date.getTime() > new Date().getTime();
  }

  get tags() {
    return this.createCardForm.get('tags') as FormArray<
      FormGroup<{
        tag: FormControl<string | null>;
      }>
    >;
  }

  public addTagSubForm() {
    const tagGroup = this.fb.group({
      tag: ['', [Validators.required]],
    });
    this.tags.push(tagGroup);
  }

  public removeTag(index: number, e: MouseEvent): void {
    e.preventDefault();
    this.tags.removeAt(index);
  }

  public trackByFn(index: number): string {
    return index.toString();
  }

  public submit() {
    this.createCardForm.reset();
  }

  constructor(private fb: FormBuilder) {}
}
