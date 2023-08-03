import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  newComment = new Subject();

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/posts`);
  }

  getPost = (id: string): Observable<Post> => {
    return this.http.get<Post>(`${environment.apiBaseUrl}/posts/${id}`);
  };

  createPost = (payload: any) => {
    return this.http.post(`${environment.apiBaseUrl}/posts`, payload);
  };

  updatePost = (id: string, payload: any) => {
    return this.http.put(`${environment.apiBaseUrl}/posts/${id}`, payload);
  };

  deletePost = (id: string) => {
    return this.http.delete(`${environment.apiBaseUrl}/posts/${id}`);
  };

  addComment = (id: string, payload: any) => {
    return this.http.put(
      `${environment.apiBaseUrl}/posts/${id}/comment`,
      payload
    );
  };
}
