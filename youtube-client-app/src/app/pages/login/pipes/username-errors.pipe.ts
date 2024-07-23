import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'userNameErrors',
  standalone: true,
})
export class UserNameErrorsPipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string {
    if (!errors) {
      return '';
    }
    if (errors['required']) {
      return 'Please enter a login email!';
    }
    if (errors['email']) {
      return 'The login email is invalid!';
    }
    return '';
  }
}
