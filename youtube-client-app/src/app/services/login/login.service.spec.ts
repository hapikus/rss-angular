import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';

const enum DataMock {
  key = 'fakeToken',
  value = 'user-password',
}

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with isLoginSignal as false when no token is present', () => {
    expect(service.isLoginSignal()).toBeFalsy();
  });

  it('should initialize with isLoginSignal as true when token is present', () => {
    localStorage.setItem(DataMock.key, DataMock.value);
    const newServiceInstance = new LoginService();
    expect(newServiceInstance.isLoginSignal()).toBeTruthy();
  });

  it('should set isLoginSignal to true on login', () => {
    service.login('user', 'password');
    expect(localStorage.getItem(DataMock.key)).toBe(DataMock.value);
    expect(service.isLoginSignal()).toBeTruthy();
  });

  it('should set isLoginSignal to false on logout', () => {
    localStorage.setItem(DataMock.key, DataMock.value);
    service.logout();
    expect(localStorage.getItem(DataMock.key)).toBeNull();
    expect(service.isLoginSignal()).toBeFalsy();
  });
});
