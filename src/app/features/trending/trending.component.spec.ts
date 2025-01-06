import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingComponent } from './trending.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MovieCardComponent } from '../../shared/movie-card/movie-card.component';
import * as MovieActions from '../../core/store/trending/actions';

describe('TrendingComponent', () => {
  let component: TrendingComponent;
  let fixture: ComponentFixture<TrendingComponent>;
  let store: MockStore;
  let spinnerService: jasmine.SpyObj<NgxSpinnerService>;
  let debugElement: DebugElement;

  const initialState = {
    trending: {
      loading: false,
      movies: [],
      currentPage: 1,
      totalPages: 1,
    },
  };

  beforeEach(async () => {
    spinnerService = jasmine.createSpyObj('NgxSpinnerService', ['show', 'hide']);

    await TestBed.configureTestingModule({
      imports: [TrendingComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: NgxSpinnerService, useValue: spinnerService },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TrendingComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title "Trending Movies"', () => {
    const titleElement: HTMLElement = debugElement.query(By.css('h1')).nativeElement;
    expect(titleElement.textContent).toContain('Trending Movies');
  });

  it('should show spinner when loading', () => {
    store.setState({
      trending: {
        ...initialState.trending,
        loading: true,
      },
    });
    fixture.detectChanges();
    expect(spinnerService.show).toHaveBeenCalled();
  });

  it('should hide spinner when not loading', () => {
    store.setState({
      trending: {
        ...initialState.trending,
        loading: false,
      },
    });
    fixture.detectChanges();
    expect(spinnerService.hide).toHaveBeenCalled();
  });

  it('should dispatch loadTrendingMovies action on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(MovieActions.loadTrendingMovies({ page: 1 }));
  });

  it('should update current page on page change', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.onPageChange(2);
    expect(component.p()).toBe(2);
    expect(dispatchSpy).toHaveBeenCalledWith(MovieActions.loadTrendingMovies({ page: 2 }));
  });

  it('should render movie cards', () => {
    const movies = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];
    store.setState({
      trending: {
        ...initialState.trending,
        movies,
      },
    });
    fixture.detectChanges();
    const movieCards = debugElement.queryAll(By.directive(MovieCardComponent));
    expect(movieCards.length).toBe(2);
  });
});
