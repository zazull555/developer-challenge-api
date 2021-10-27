import { createAction, props } from '@ngrx/store';
import { Comment } from 'src/app/shared/models/comment-model';

//Get Post List
export const getPostList = createAction(
  '[Posts] Get All Posts Action',
  props<{ request: any }>()
);
export const loadPostList = createAction(
  '[Posts] Load All Posts Action',
  props<{ response: any[] }>()
);
//Get Comments List
export const getCommentsList = createAction(
  '[Comments] Get All Posts Action',
  props<{ request: any }>()
);
export const loadCommentsList = createAction(
  '[Comments] Load All Posts Action',
  props<{ response: any[] }>()
);
//Get Post By Id
export const getPost = createAction(
  '[Posts] Get Post by id Action',
  props<{ id: any }>()
);
export const loadPost = createAction(
  '[Posts] Load Post Action',
  props<{ response: any }>()
);
//Get Comments By Post Id
export const getComments = createAction(
  '[Comments] Get Comments by id Action',
  props<{ id: any }>()
);
export const loadComments = createAction(
  '[Comments] Load Post Action',
  props<{ response: Comment[] }>()
);
//add Comment to Post
export const addComment = createAction(
  '[Comments] Add comment to post Action',
  props<{ comment: Comment }>()
);
//update Comment to Post
export const updateComment = createAction(
  '[Comments] Update comment to post Action',
  props<{ comment: Comment }>()
);
