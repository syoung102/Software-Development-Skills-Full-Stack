import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http) { }

  // Reach into back-end API and make post request to register 
  registerUser(user) {
    // Set a header value
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/users/register', user, {headers: headers}).map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers}).map(res => res.json());
  }

  storeUserData(token, user) {
    // Automatically within local storage
    localStorage.setItem('id_token', token);
    // Local storage can only store string
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    // Clear localstorage
    localStorage.clear();
  }  
}
