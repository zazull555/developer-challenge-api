import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { postMock, postListMock } from 'src/app/shared/models/mock-data';
import { BlogService } from 'src/app/shared/services/blog.service';
import { AppState } from 'src/app/store';
import { getComments } from 'src/app/store/actions/blog.actions';
import { BlogState } from 'src/app/store/reducers/blog.reducer';

import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;
  let store: MockStore<AppState>;
  const initialState: BlogState = {
    allComments: [],
    commentList: [],
    post: postMock,
    postList: postListMock,
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [provideMockStore({ initialState }), BlogService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch get Comments', () => {
    component.loadComments(10);
    expect(store.dispatch).toHaveBeenCalledWith(getComments({ id: 10 }));
  });
});
