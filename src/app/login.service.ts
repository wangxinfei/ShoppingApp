import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  authenticate(username: string, password: string) {
    if (username === '123' && password === '123') {
      return true;
    }
    return false;
  }
}
