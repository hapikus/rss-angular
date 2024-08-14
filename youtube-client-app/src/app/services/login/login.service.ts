import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isLoginSignal = signal(!!localStorage?.getItem('fakeToken'));

  public login(user?: string, password?: string) {
    localStorage.setItem('fakeToken', `${user}-${password}`);
    this.isLoginSignal.set(true);
  }

  public logout() {
    localStorage.removeItem('fakeToken');
    this.isLoginSignal.set(false);
  }
}
