import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../models/test';
import { Question } from '../models/question'; // Asegúrate de tener un modelo para las preguntas

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private baseUrl = 'http://localhost:8080/tests';

  constructor(private http: HttpClient) {}

  getTestsByCompanyId(companyId: string): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.baseUrl}/${companyId}`);
  }

  createTest(test: Test): Observable<any> {
    return this.http.post(`${this.baseUrl}`, test);
  }

  updateTest(test: Test): Observable<any> {
    return this.http.put(`${this.baseUrl}`, test);
  }

  deleteTestByIdAndCompanyId(id: string, companyId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteByIdAndCompanyId/${id}/${companyId}`);
  }

  getAnswersByTestIdAndQuestionId(testId: string, questionId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/answers/test/${testId}/question/${questionId}`);
  }

  createAnswer(answer: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/answers`, answer);
  }

  deleteAnswerByTestIdAndQuestionId(testId: string, questionId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/answers/test/${testId}/question/${questionId}`);
  }

  updateisTestDone(user: any): Observable<any> {
    const url = `http://localhost:8080/api/users/${user.id}`;
    return this.http.patch(url, { isTestDone: true });
  }

  registerTest(testDetails: Test): Observable<any> {
    return this.createTest(testDetails);
  }

  getQuestionsByTestId(testId: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.baseUrl}/questions/${testId}`);
  }
}