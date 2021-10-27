import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { postMock, postListMock } from 'src/app/shared/models/mock-data';
import { BlogService } from 'src/app/shared/services/blog.service';
import { AppState } from 'src/app/store';
import { BlogState } from 'src/app/store/reducers/blog.reducer';

import { CommentPostComponent } from './comment-post.component';

describe('CommentPostComponent', () => {
  let component: CommentPostComponent;
  let fixture: ComponentFixture<CommentPostComponent>;
  let store: MockStore<AppState>;
  const initialState: BlogState = {
    allComments: [],
    commentList: [],
    post: postMock,
    postList: postListMock,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentPostComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [provideMockStore({ initialState }), BlogService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentPostComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
