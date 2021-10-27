import { Action, createReducer, on } from '@ngrx/store';

import { Comment } from 'src/app/shared/models/comment-model';
import { Post } from 'src/app/shared/models/post-model';

import * as BlogActionTypes from '../actions/blog.actions';

export interface BlogState {
  postList?: Post[];
  post?: Post;
  commentList?: Comment[];
  allComments?: Comment[];
}

export const initialState: BlogState = {
  postList: [],
  post: null,
  commentList: [],
  allComments: [],
};

const blogReducer = createReducer(
  initialState,
  on(
    BlogActionTypes.getPostList,
    (state, { request }) =>
      ({
        ...state,
        error: null,
        action: request,
      } as BlogState)
  ),
  on(BlogActionTypes.loadPostList, (state, { response }) => {
    return {
      ...state,
      postList: response,
    };
  }),
  on(
    BlogActionTypes.getCommentsList,
    (state, { request }) =>
      ({
        ...state,
        error: null,
        action: request,
      } as BlogState)
  ),
  on(BlogActionTypes.loadCommentsList, (state, { response }) => {
    return {
      ...state,
      allComments: response,
    };
  }),
  on(
    BlogActionTypes.getPost,
    (state, { id }) =>
      ({
        ...state,
        action: id,
      } as BlogState)
  ),
  on(BlogActionTypes.loadPost, (state, { response }) => {
    return {
      ...state,
      post: response ?? undefined,
    };
  }),
  on(
    BlogActionTypes.getComments,
    (state, { id }) =>
      ({
        ...state,
        action: id,
      } as BlogState)
  ),
  on(BlogActionTypes.loadComments, (state, { response }) => {
    return {
      ...state,
      commentList: response,
    };
  })
);

export function reducer(state: BlogState | undefined, action: Action) {
  return blogReducer(state, action);
}
