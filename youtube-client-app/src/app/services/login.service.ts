import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { store } from '../stores/store';
import { Store } from '../stores/types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private store: Store = store;
  public isLogin = new Observable<boolean>((observer: Observer<boolean>) => {
    observer.next(!!localStorage?.getItem('fakeToken'));
  });

  public login(user?: string, password?: string) {
    localStorage.setItem('fakeToken', `${user}-${password}`);
    this.store.login = true;
  }

  public logout() {
    localStorage.removeItem('fakeToken');
    this.store.login = false;
  }
}
