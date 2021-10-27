import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { postMock, postListMock } from 'src/app/shared/models/mock-data';
import { BlogService } from 'src/app/shared/services/blog.service';
import { AppState } from 'src/app/store';
import { getPost } from 'src/app/store/actions/blog.actions';
import { BlogState } from 'src/app/store/reducers/blog.reducer';
import { CommentListComponent } from '../../comments/comment-list/comment-list.component';
import { CommentPostComponent } from '../../comments/comment-post/comment-post.component';

import { PostDetailComponent } from './post-detail.component';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let store: MockStore<AppState>;
  const initialState: BlogState = {
    allComments: [],
    commentList: [],
    post: postMock,
    postList: postListMock,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PostDetailComponent,
        CommentListComponent,
        CommentPostComponent,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [provideMockStore({ initialState }), BlogService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    component.currentPost = postMock;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch get Post', () => {
    component.loadPost('10');
    expect(store.dispatch).toHaveBeenCalledWith(getPost({ id: '10' }));
  });
});
