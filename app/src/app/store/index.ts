import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromBlog from './reducers/blog.reducer';

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

export interface AppState {
  blog: fromBlog.BlogState;
}

export const reducers: ActionReducerMap<AppState> = {
  blog: fromBlog.reducer,
};

// Blog State
export const blogState = (state: AppState) => state.blog;
export const postListState = createSelector(blogState, (blog) => blog.postList);
export const postState = createSelector(blogState, (blog) => blog.post);
export const commentListState = createSelector(
  blogState,
  (blog) => blog.commentList
);
export const allCommentListState = createSelector(
  blogState,
  (blog) => blog.allComments
);
