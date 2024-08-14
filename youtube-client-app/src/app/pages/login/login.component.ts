import { Component, OnInit } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@services/login/login.service';
import { ErrorsFormatterPipe } from '@shared/pipes/errors-formatter.pipe';
import { Store } from '@ngrx/store';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { Page } from 'src/app/redux/state.model';
import { passwordValidator } from './helpers';
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
export class LoginComponent implements OnInit {
  public loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator()]],
  });
  public userNameError: string = '';
  public passwordError: string = '';

  public ngOnInit(): void {
    this.store.dispatch(pageChange({ page: Page.Main }));
  }

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
    private store: Store,
  ) {}
}
