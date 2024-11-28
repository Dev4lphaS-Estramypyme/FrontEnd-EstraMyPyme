import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userBaseUrl = 'http://localhost:8080/api/users';
  private userCompanyBaseUrl = 'http://localhost:8080/api/usersCompanies';

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  registerUser(userDetails: any): Observable<any> {
    return this.http.post(`${this.userBaseUrl}/register`, userDetails).pipe(
      catchError(error => {
        console.error('Error al intentar registrar:', error);
        return of(null);
      })
    );
  }

  registerUserCompany(userDetails: any): Observable<any> {
    return this.http.post(`${this.userCompanyBaseUrl}/register`, userDetails).pipe(
      catchError(error => {
        console.error('Error al intentar registrar:', error);
        return of(null);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.userBaseUrl}/login`, { email, password }).pipe(
      map(response => {
        if (response && response.user) {
          this.isLoggedIn = true;
          return response;
        } else {
          return null;
        }
      }),
      catchError(() => of(null))
    );
  }

  loginCompany(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.userCompanyBaseUrl}/login`, { email, password }).pipe(
      map(response => {
        if (response && response.userCompany) {
          this.isLoggedIn = true;
          return response;
        } else {
          return null;
        }
      }),
      catchError(() => of(null))
    );
  }
}