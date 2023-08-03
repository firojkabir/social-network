import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser = (payload: Partial<User>) => {
    return this.http.post<any>(
      `${environment.apiBaseUrl}/auth/register`,
      payload
    );
  };

  getUsers = (): Observable<User[]> => {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/users`);
  };

  emailExists = (payload: any): Observable<User[]> => {
    return this.http.post<any>(
      `${environment.apiBaseUrl}/auth/email/check`,
      payload
    );
  };

  phoneExists = (payload: any): Observable<User[]> => {
    return this.http.post<any>(
      `${environment.apiBaseUrl}/auth/phone/check`,
      payload
    );
  };

  getCurrentUser = (): Observable<User[]> => {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/users/current`);
  };

  getUser = (id: string): Observable<User> => {
    return this.http.get<User>(`${environment.apiBaseUrl}/users/${id}`);
  };

  updateUser = (id: string, payload: any) => {
    return this.http.put(`${environment.apiBaseUrl}/users/${id}`, payload);
  };

  deleteUser = (id: string) => {
    return this.http.delete(`${environment.apiBaseUrl}/users/${id}`);
  };

  followUser = (id: string, payload: any) => {
    return this.http.put(
      `${environment.apiBaseUrl}/users/${id}/follow`,
      payload
    );
  };

  unfollowUser = (id: string, payload: any) => {
    return this.http.put(
      `${environment.apiBaseUrl}/users/${id}/unfollow`,
      payload
    );
  };
}
