import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpResponse, Omit } from '../interface';

interface Login {
  admin: boolean;
  username: string;
  email: string;
  token: string;
}

interface AutoLogin {
  admin: boolean;
  username: string;
  email: string;
}

interface Register {
  username?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SignService {
  constructor(private http: HttpClient) {}

  public duplicationCheck = (value: string, what: string): Observable<Omit<HttpResponse, 'value'>> =>
    this.http.get(`/api/auth/duplication/${what}?checkvalue=${value}`).pipe(
      first(),
      map((res: Omit<HttpResponse, 'value'>) => res),
      catchError((err: { error: Omit<HttpResponse, 'value'> }) => of(err.error))
    )

  public autoSignIn = (token: string): Observable<Omit<HttpResponse, 'value'> & { value: AutoLogin }> =>
    this.http.post('/api/auth/check', {}, { headers: { jwttoken: token } }).pipe(
      first(),
      map((res: Omit<HttpResponse, 'value'> & { value: AutoLogin }) => res),
      catchError((err: { error: HttpResponse }) => of({ ...err.error, value: { username: '', email: '', admin: false } }))
    )

  public signIn = (email: string, password: string): Observable<Omit<HttpResponse, 'value'> & { value: Login }> =>
    this.http.post('/api/auth/login', { email, password }).pipe(
      first(),
      map((res: Omit<HttpResponse, 'value'> & { value: Login }) => res),
      catchError((err: { error: HttpResponse }) => of({ ...err.error, value: { admin: false, username: '', email: '', token: '' } }))
    )

  public signUp = (username: string, email: string, password: string): Observable<Omit<HttpResponse, 'value'> & { value?: Register }> =>
    this.http.post('/api/auth/register', { username, email, password }).pipe(
      first(),
      map((res: Omit<HttpResponse, 'value'> & { value?: Register }) => res),
      catchError((err: { error: HttpResponse }) => of(err.error))
    )
}
