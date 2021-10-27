import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentPostComponent } from './modules/comments/comment-post/comment-post.component';
import { PostDetailComponent } from './modules/posts/post-detail/post-detail.component';
import { PostListComponent } from './modules/posts/post-list/post-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'post-list',
    pathMatch: 'full',
  },
  {
    path: 'post-list',
    component: PostListComponent,
  },
  {
    path: 'post-detail/:id',
    component: PostDetailComponent,
  },
  {
    path: 'comment-detail/:id',
    component: CommentPostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
