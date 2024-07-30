import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isLogin$ = new BehaviorSubject<boolean>(!!localStorage?.getItem('fakeToken'));

  public login(user?: string, password?: string) {
    localStorage.setItem('fakeToken', `${user}-${password}`);
    this.isLogin$.next(true);
  }

  public logout() {
    localStorage.removeItem('fakeToken');
    this.isLogin$.next(false);
  }
}
