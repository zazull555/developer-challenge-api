import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './modules/posts/post-list/post-list.component';
import { PostDetailComponent } from './modules/posts/post-detail/post-detail.component';
import { CommentListComponent } from './modules/comments/comment-list/comment-list.component';
import { CommentPostComponent } from './modules/comments/comment-post/comment-post.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { BlogEffects } from './store/effects/blog.effects';
import { BlogService } from './shared/services/blog.service';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostDetailComponent,
    CommentListComponent,
    CommentPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([BlogEffects]),
  ],
  providers: [BlogService],
  bootstrap: [AppComponent],
})
export class AppModule {}
