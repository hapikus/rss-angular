import { Component } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '../../stores/types';
import { store } from '../../stores/store';
import { LoginService } from '../../services/login.service';
import { passwordValidator } from './helpers';
import { ErrorsFormatterPipe } from '../../shared/pipes/errors-formatter.pipe';
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
  public store: Store = store;

  public loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator()]],
  });
  public userNameError: string = '';
  public passwordError: string = '';

  public formIsNotValid(): boolean {
    return (
      !this.loginForm.valid ||
      !this.loginForm.value.userName ||
      !this.loginForm.value.password
    );
  }

  public submitForm(): void {
    if (this.formIsNotValid()) {
      return;
    }

    this.loginService.login(
      this.loginForm.value.userName!,
      this.loginForm.value.password!,
    );
    this.router.navigate(['']);
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) {}
}
