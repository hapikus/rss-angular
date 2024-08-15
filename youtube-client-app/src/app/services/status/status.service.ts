import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  public isApiLoading = signal(false);
}
