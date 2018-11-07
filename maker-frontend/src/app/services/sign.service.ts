import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpResponse, Omit } from '../interface';

interface Login {
  admin?: boolean;
  username?: string;
  email?: string;
  token?: string;
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

  public signIn = (email: string, password: string): Observable<Omit<HttpResponse, 'value'> & { value?: Login }> =>
    this.http.post('/api/auth/login', { email, password }).pipe(
      first(),
      map((res: Omit<HttpResponse, 'value'> & { value?: Login }) => res),
      catchError((err: { error: HttpResponse }) => of(err.error))
    )

  public signUp = (username: string, email: string, password: string): Observable<Omit<HttpResponse, 'value'> & { value?: Register }> =>
    this.http.post('/api/auth/register', { username, email, password }).pipe(
      first(),
      map((res: Omit<HttpResponse, 'value'> & { value?: Register }) => res),
      catchError((err: { error: HttpResponse }) => of(err.error))
    )
}
