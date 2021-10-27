import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Post } from 'src/app/shared/models/post-model';
import { AppState, postListState } from 'src/app/store';
import { getPostList } from 'src/app/store/actions/blog.actions';

import { cloneDeep } from 'lodash';
@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  loadingPosts$: Observable<Post[]>;
  postList: Post[];
  loadingPostsSubs: Subscription;

  constructor(private store: Store<AppState>) {
    this.loadingPosts$ = this.store.pipe(select(postListState));
  }

  loadPosts() {
    this.loadingPostsSubs = this.loadingPosts$.subscribe((posts: Post[]) => {
      if (posts !== null && posts !== undefined) {
        this.postList = posts;
        this.postList = cloneDeep(posts);
        this.postList.sort(
          (a, b) =>
            new Date(b.publish_date).getTime() -
            new Date(a.publish_date).getTime()
        );
      }
    });

    this.store.dispatch(getPostList(null));
  }

  ngOnInit(): void {
    this.loadPosts();
  }
  ngOnDestroy(): void {
    if (this.loadingPostsSubs) {
      this.loadingPostsSubs.unsubscribe();
    }
  }
}
