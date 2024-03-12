import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubimtService {

  visibility = new BehaviorSubject(false);

  constructor(public http: HttpClient) { }

  show() {
    this.visibility.next(true);
  }

  hide() {
    this.visibility.next(false);
  }
}