import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean>;
  numberOfActiveUsers: Subject<number> = new Subject();

  constructor(private http: HttpClient) {
    this.isLoggedIn = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  }

  login = (payload: any) => {
    return this.http.post(`${environment.apiBaseUrl}/auth/login`, payload).pipe(
      tap((res: any) => {
        this.storeAuthenticationInfo(res.token);
        this.isLoggedIn.next(true);
      })
    );
  };

  logout = () => {
    localStorage.clear();
    this.isLoggedIn.next(false);
  };

  storeAuthenticationInfo = (token: string) => {
    localStorage.setItem('token', token);
  };

  isUserLoggedIn = (): boolean => {
    return !!localStorage.getItem('token');
  };
}
