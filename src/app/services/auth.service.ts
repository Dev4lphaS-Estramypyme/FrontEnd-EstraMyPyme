import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/usersCompanies';

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  registerUser(userDetails: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userDetails).pipe(
      catchError(error => {
        console.error('Error al intentar registrar:', error);
        return of(null);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password }).pipe(
      map(user => {
        if (user) {
          this.isLoggedIn = true;
          return user;
        } else {
          return null;
        }
      }),
      catchError(() => of(null))
    );
  }
}