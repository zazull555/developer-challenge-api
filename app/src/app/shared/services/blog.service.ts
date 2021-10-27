import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment-model';

const BASEURL = 'http://localhost:9000';
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set(
      'Content-type',
      'application/x-www-form-urlencoded; '
    );
    const url = `${BASEURL}/posts`;
    return this.http.get(url, { headers });
  }

  getPost(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set(
      'Content-type',
      'application/x-www-form-urlencoded; '
    );
    const url = `${BASEURL}/posts/${id}`;
    return this.http.get(url, { headers });
  }

  getComments(): Observable<any> {
    const url = `${BASEURL}/comments`;
    return this.http.get(url);
  }

  getCommentsByPost(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set(
      'Content-type',
      'application/x-www-form-urlencoded; '
    );
    const url = `${BASEURL}/posts/${id}/comments`;
    return this.http.get(url, { headers });
  }

  addComment(comment: Comment) {
    const url = `${BASEURL}/posts/${comment.postId}/comments`;
    return this.http.post(url, comment);
  }

  updateComment(comment: Comment) {
    const url = `${BASEURL}/comments/${comment.id}`;
    return this.http.put(url, comment);
  }
}
