import { Component, inject } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '../../stores/types';
import { store } from '../../stores/store';
import { LoginService } from '../../shared/services/login.service';
import { passwordValidator } from './helpers';
import { ErrorsFormatterPipe } from './pipes/errors-formatter.pipe';
import { UserNameErrorsPipe } from './pipes/username-errors.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    ErrorsFormatterPipe,
    UserNameErrorsPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private router = inject(Router);
  private loginService = inject(LoginService);
  public store: Store = store;

  public loginForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    userName: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator()]],
  });
  public userNameError: string = '';
  public passwordError: string = '';

  public submitForm(): void {
    if (!this.loginForm.valid) {
      return;
    }
    this.loginService.login(
      this.loginForm.value.userName,
      this.loginForm.value.password,
    );
    this.store.login = true;
    this.router.navigate(['']);
  }

  constructor(private fb: NonNullableFormBuilder) {}
}
