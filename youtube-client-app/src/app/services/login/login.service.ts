import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private isLogin = new BehaviorSubject<boolean>(!!localStorage?.getItem('fakeToken'));
  public isLogin$: Observable<boolean> = this.isLogin.asObservable();

  public login(user?: string, password?: string) {
    localStorage.setItem('fakeToken', `${user}-${password}`);
    this.isLogin.next(true);
  }

  public logout() {
    localStorage.removeItem('fakeToken');
    this.isLogin.next(false);
  }
}
