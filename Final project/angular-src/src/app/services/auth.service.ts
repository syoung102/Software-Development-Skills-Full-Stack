import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http:Http) { }

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

  getProfile() {
    this.loadToken();
    let headers = new Headers();
    
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      .map(res => res.json());
  }

  getForum() {
    //this.loadToken();
    let headers = new Headers();
    //headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    console.log("hi!");

    return this.http.get('http://localhost:3000/forums/forum', {headers: headers}).map(res => res.json());
  }

  postComment(forum) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/forums/forum', forum, {headers: headers}).map(res => res.json());
  }


  storeUserData(token, user) {
    // Automatically within local storage
    localStorage.setItem('id_token', token);
    // Local storage can only store string
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired("id_token");
  }

  logout() {
    this.authToken = null;
    this.user = null;
    // Clear localstorage
    localStorage.clear();
  }

}
