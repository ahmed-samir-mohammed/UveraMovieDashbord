import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';
import { Movie } from '../../../core/interface/trend.interface';
import { ActivatedRoute } from '@angular/router';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  const movie: Movie = {
    backdrop_path: '/test_backdrop.jpg',
    id: 1,
    name: 'Test Movie',
    title: 'Test Title',
    poster_path: '/test.jpg',
    overview: 'This is a test movie overview.',
    release_date: '2023-01-01',
    vote_average: 8.5,
    vote_count: 1000,
    popularity: 150.0,
    original_language: 'en',
    genre_ids: [28, 12],
    adult: false,
    video: false,
    original_title: 'Test Original Title',
    media_type: 'movie',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = movie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display movie poster', () => {
    component.movie = movie;
    fixture.detectChanges();
    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelector('img');
    expect(imgElement.src).toContain('test.jpg');
  });

  it('should display movie name if available', () => {
    component.movie = movie;
    fixture.detectChanges();
    const titleElement: HTMLElement =
      fixture.nativeElement.querySelector('.font-bold');
    expect(titleElement.textContent).toContain('Test Movie');
  });
});
