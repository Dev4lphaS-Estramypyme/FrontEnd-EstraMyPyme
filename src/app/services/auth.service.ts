import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Admin } from '../models/admin';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/users';

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  registerUser(userDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userDetails);
  }

  login(email: string, password: string): Observable<User | Admin | null> {
    return this.http.post<User | Admin>(`${this.baseUrl}/login`, { email, password }).pipe(
      map(user => {
        if (user && user.password === password) {
          return user;
        } else {
          return null;
        }
      }),
      catchError(() => of(null))
    );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  getLogin() {
    return this.isLoggedIn;
  }
}