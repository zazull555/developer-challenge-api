import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Comment } from 'src/app/shared/models/comment-model';
import { Post } from 'src/app/shared/models/post-model';
import { AppState, postState } from 'src/app/store';
import { cloneDeep } from 'lodash';
import { getPost } from 'src/app/store/actions/blog.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit, OnDestroy {
  loadedPost$: Observable<Post>;

  postSub: Subscription;

  currentPost: Post;
  id: any;
  commentDataForm: FormGroup;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loadedPost$ = this.store.pipe(select(postState));
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'ignore';

    this.route.params.subscribe((params) => {
      this.id = params.id;

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      if (this.id && this.id > 0) {
        this.loadPost(this.id);
      }
    });
    this.loadingPost();
  }

  loadingPost() {
    this.postSub = this.loadedPost$.subscribe((post: Post) => {
      if (post !== null && post !== undefined) {
        this.currentPost = cloneDeep(post);
      }
    });
  }

  loadPost(id: string) {
    if (id) {
      this.store.dispatch(getPost({ id: id }));
    }
  }

  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }
}
