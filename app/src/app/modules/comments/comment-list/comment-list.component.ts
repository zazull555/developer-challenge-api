import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState, commentListState } from 'src/app/store';

import { Comment } from 'src/app/shared/models/comment-model';
import { getComments } from 'src/app/store/actions/blog.actions';
import { Router } from '@angular/router';
@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommentListComponent implements OnInit, OnDestroy {
  loadedComments$: Observable<Comment[]>;
  loadCommentsSub: Subscription;
  commentList: Comment[];

  //Post Code
  _code: number;

  @Input() set postCode(code) {
    if (code !== null && code !== undefined) {
      this._code = code;

      this.loadComments(this._code);
    }
  }
  constructor(private store: Store<AppState>, private router: Router) {
    this.loadedComments$ = this.store.pipe(select(commentListState));
  }
  ngOnDestroy(): void {
    if (this.loadCommentsSub) {
      this.loadCommentsSub.unsubscribe();
    }
    this._code = 0;
  }

  ngOnInit(): void {}

  loadComments(id: number) {
    this.loadCommentsSub = this.loadedComments$.subscribe(
      (comments: Comment[]) => {
        if (comments !== null && comments !== undefined) {
          this.commentList = comments;
        }
      }
    );
    this.store.dispatch(getComments({ id: id }));
  }

  updateComment(id) {
    this.router.navigateByUrl(`/comment-detail/${id}`);
  }
}
