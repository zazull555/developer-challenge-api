import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { postListMock, postMock } from 'src/app/shared/models/mock-data';
import { BlogService } from 'src/app/shared/services/blog.service';
import { AppState } from 'src/app/store';
import { getPostList } from 'src/app/store/actions/blog.actions';
import { BlogState } from 'src/app/store/reducers/blog.reducer';
import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let store: MockStore<AppState>;
  const initialState: BlogState = {
    allComments: [],
    commentList: [],
    post: postMock,
    postList: postListMock,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
      ],
      providers: [provideMockStore({ initialState }), BlogService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch getPostList', () => {
    component.loadPosts();
    expect(store.dispatch).toHaveBeenCalledWith(getPostList(null));
  });
});
