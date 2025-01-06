import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = 'http://localhost:3000/users';
  readonly http: HttpClient = inject(HttpClient);

  register(user: any) {
    return this.http.post(`${this.URL}/register`, user);
  }

  login(user: any) {
    return this.http.post(`${this.URL}/login`, user);
  }

  getUserById(id: any) {
    return this.http.get(`${this.URL}/${id}`);
  }

  editUser(id: any, user: any) {
    return this.http.put(`${this.URL}/${id}`, user);
  }

  isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      return payload.userId;
    }
    return null;
  }

}