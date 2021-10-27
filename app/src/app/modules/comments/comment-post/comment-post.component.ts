import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Location } from '@angular/common';
import * as moment from 'moment';

import { Comment } from 'src/app/shared/models/comment-model';
import { allCommentListState, AppState } from 'src/app/store';
import {
  addComment,
  getCommentsList,
  updateComment,
} from 'src/app/store/actions/blog.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

const FORM_PARAMS = {
  user: 'user',
  content: 'content',
};
@Component({
  selector: 'comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommentPostComponent implements OnInit {
  @Input() id: any = 0;
  @Input() creation: boolean = false;
  commentId: any;
  currentComment: Comment;

  loadedComments$: Observable<Comment[]>;
  loadedCommentsSub: Subscription;
  commentDataForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loadedComments$ = this.store.pipe(select(allCommentListState));
  }

  ngOnInit(): void {
    this.createCommentForm();

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'ignore';

    this.route.params.subscribe((params) => {
      this.commentId = params.id;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      if (this.commentId && !this.creation) {
        this.loadComment(this.commentId);
      }
    });
  }

  createCommentForm() {
    this.commentDataForm = this.fb.group({
      [FORM_PARAMS.user]: [null, [Validators.required]],
      [FORM_PARAMS.content]: [null, [Validators.required]],
    });
  }

  loadComment(commentId: any) {
    this.loadedCommentsSub = this.loadedComments$.subscribe(
      (comments: Comment[]) => {
        if (comments !== undefined && comments !== null) {
          let elementPos = comments
            .map(function (x) {
              return x.id;
            })
            .indexOf(parseInt(commentId));

          if (elementPos !== -1) {
            this.currentComment = comments[elementPos];
            const { user, content } = this.currentComment;
            this.commentDataForm.controls[FORM_PARAMS.user].setValue(
              user ?? null
            );
            this.commentDataForm.controls[FORM_PARAMS.content].setValue(
              content ?? null
            );
          }
        }
      }
    );
    this.store.dispatch(getCommentsList(null));
  }

  back() {
    this.location.back();
  }

  addComment() {
    if (this.commentDataForm.pristine) {
      alert('No changes on inputs');
      return;
    }
    if (!this.commentDataForm.valid) {
      alert('Please fill user and comment inputs');
      this.commentDataForm.markAllAsTouched();
      return;
    }
    let comment: Comment = {
      id: this.creation ? null : this.currentComment.id,
      parent_id: null,
      postId: this.creation ? parseInt(this.id) : this.currentComment.postId,
      user: this.commentDataForm.controls[FORM_PARAMS.user].value,
      date: moment(new Date()).format('YYYY-MM-DD').toString(),
      content: this.commentDataForm.controls[FORM_PARAMS.content].value,
    };
    if (this.creation) {
      this.store.dispatch(addComment({ comment: comment }));
    } else {
      this.store.dispatch(updateComment({ comment: comment }));
    }

    this.commentDataForm.markAsPristine();
    this.commentDataForm.markAsUntouched();
  }
}
