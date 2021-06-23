import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private subject = new Subject();

  constructor() { }

  onAlert() {
    return this.subject.asObservable();
  }

  display(alertData) {
    this.subject.next(alertData);
  }
}
