import { Component } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormControl, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
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
  });

  public tags: Array<{ id: number; controlInstance: string }> = [];
  public validateTags: FormRecord<FormControl<string | null>> = this.fb.record({});

  public disabledDates(date: Date) {
    return date.getTime() > new Date().getTime();
  }

  public addTag(e?: MouseEvent): void {
    e?.preventDefault();

    const id = (this.tags.at(-1)?.id ?? -1) + 1;
    const control = {
      id,
      controlInstance: `tag${id}`,
    };
    const index = this.tags.push(control);
    this.validateTags.addControl(
      this.tags[index - 1].controlInstance,
      this.fb.control('', Validators.required),
    );
  }

  public removeTag(i: { id: number; controlInstance: string }, e: MouseEvent): void {
    e.preventDefault();
    const index = this.tags.indexOf(i);
    this.tags.splice(index, 1);
    this.validateTags.removeControl(i.controlInstance);
  }

  public trackByFn(index: number): string {
    return index.toString();
  }

  public submit() {
    this.createCardForm.reset();
    this.validateTags.reset();
  }

  constructor(private fb: FormBuilder) {}
}
