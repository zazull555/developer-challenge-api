import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { resultMemoize, Store } from '@ngrx/store';
import { from } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { Comment } from 'src/app/shared/models/comment-model';
import { Post } from 'src/app/shared/models/post-model';
import { BlogService } from 'src/app/shared/services/blog.service';
import { AppState } from '..';

import * as BlogActionTypes from '../actions/blog.actions';
@Injectable()
export class BlogEffects {
  constructor(
    private actions$: Actions,
    private blogService: BlogService,
    private router: Router
  ) {}

  // Get Posts
  getPostList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.getPostList),
      exhaustMap(() =>
        this.blogService
          .getPosts()
          .pipe(
            map((result) => BlogActionTypes.loadPostList({ response: result }))
          )
      )
    )
  );

  // Get Comments
  getCommentList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.getCommentsList),
      exhaustMap(() =>
        this.blogService
          .getComments()
          .pipe(
            map((result) =>
              BlogActionTypes.loadCommentsList({ response: result })
            )
          )
      )
    )
  );

  //Get Comments By Post
  getCommentsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.getComments),
      exhaustMap((action) =>
        this.blogService
          .getCommentsByPost(action.id)
          .pipe(
            map((result) => BlogActionTypes.loadComments({ response: result }))
          )
      )
    )
  );
  //Get Post
  getPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.getPost),
      exhaustMap((action) =>
        this.blogService
          .getPost(action.id)
          .pipe(
            map((result: Post) =>
              BlogActionTypes.loadPost({ response: result })
            )
          )
      )
    )
  );
  //Add Comment
  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.addComment),
      exhaustMap((action) =>
        this.blogService
          .addComment(action.comment)
          .pipe(
            map((result: Comment) =>
              BlogActionTypes.getComments({ id: result?.postId })
            )
          )
      )
    )
  );
  //Update Comment
  updateComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActionTypes.updateComment),
      exhaustMap((action) =>
        this.blogService.updateComment(action.comment).pipe(
          map((result: Comment) => {
            this.router.navigate([`/post-detail/${result?.postId}`]);
            return BlogActionTypes.getComments({ id: result?.postId });
          })
        )
      )
    )
  );
}
