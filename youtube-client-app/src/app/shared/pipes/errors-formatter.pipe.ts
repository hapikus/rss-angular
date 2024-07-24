import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorsFormatter',
  standalone: true,
})
export class ErrorsFormatterPipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string {
    if (!errors) {
      return '';
    }
    return Object.values(errors).join('');
  }
}
