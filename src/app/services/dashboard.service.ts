import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map, Observable } from 'rxjs';
import { Test } from '../models/test';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/api/usersCompanies';
  private baseUrlTest = 'http://localhost:8080/api/tests';
  private baseUrlQuestions = 'http://localhost:8080/api/questions';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUsersWithTestDone(): Observable<User[]> {
    return this.getUsers().pipe(
      map((users: User[]) => users.filter(user => user.isTestDone))
    );
  }

  getTestById(id: string): Observable<Test | undefined> {
    return this.http.get<Test>(`${this.baseUrlTest}/${id}`);
  }

  getActiveQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrlQuestions}/active`);
  }
}