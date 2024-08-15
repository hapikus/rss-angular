import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@services/login/login.service';
import { Store } from '@ngrx/store';
import { pageChange } from 'src/app/redux/actions/page.actions';
import { Page } from 'src/app/redux/state.model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: jest.Mocked<LoginService>;
  let router: jest.Mocked<Router>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    loginService = {
      login: jest.fn(),
    } as unknown as jest.Mocked<LoginService>;

    router = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        LoginComponent,
      ],
      providers: [
        FormBuilder,
        provideMockStore({ initialState }),
        { provide: LoginService, useValue: loginService },
        { provide: Router, useValue: router },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch pageChange on initialization', () => {
    const action = pageChange({ page: Page.Main });
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('should initialize form with validators', () => {
    expect(component.loginForm.get('userName')?.validator).toBeTruthy();
    expect(component.loginForm.get('password')?.validator).toBeTruthy();
  });

  it('should return false if form is not valid', () => {
    component.loginForm.controls.userName.setValue('');
    component.loginForm.controls.password.setValue('');
    expect(component.formIsNotValid()).toBe(true);
  });

  it('should return true if form is valid', () => {
    component.loginForm.controls.userName.setValue('test@example.com');
    component.loginForm.controls.password.setValue('validPassword123QW!');
    expect(component.formIsNotValid()).toBe(false);
  });

  it('should call loginService.login and router.navigate on submitForm if form is valid', () => {
    component.loginForm.controls.userName.setValue('test@example.com');
    component.loginForm.controls.password.setValue('validPassword123QW!');
    component.submitForm();

    expect(loginService.login).toHaveBeenCalledWith('test@example.com', 'validPassword123QW!');
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should not call loginService.login or router.navigate on submitForm if form is invalid', () => {
    component.loginForm.controls.userName.setValue('');
    component.loginForm.controls.password.setValue('');
    component.submitForm();

    expect(loginService.login).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
