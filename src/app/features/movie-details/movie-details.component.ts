import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { TMDBService } from './../../core/services/tmdb.service';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../core/models/trend.interface';

@Component({
  selector: 'app-movie-details',
  imports: [UpperCasePipe, NgIf],
  template: `<div class="container mx-auto px-4 py-6">
    <div class="flex flex-col md:flex-row gap-6 items-start">
      <img
        class="rounded-lg fixed top-0 left-0 w-screen z-0 h-screen object-cover"
        [src]="'https://image.tmdb.org/t/p/w500' + movie.backdrop_path"
        [alt]="movie.title"
      />

      <div class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-10 pt-32">
        <div class="flex-1 mx-auto w-[90vw]">
          <h1 class="text-3xl font-bold text-gray-800">{{ movie.title }}</h1>
          <p class="italic text-gray-500">{{ movie.original_title }}</p>
          <div class="flex gap-2 mt-2">
            <span
              *ngIf="!movie.adult"
              class="px-2 py-1 bg-green-500 text-white text-xs rounded"
            >
              All Ages
            </span>
            <span
              *ngIf="movie.adult"
              class="px-2 py-1 bg-red-500 text-white text-xs rounded"
            >
              Adults Only
            </span>
          </div>

          <p class="text-gray-700 mt-4">{{ movie.overview }}</p>

          <div class="mt-4">
            <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
            <p>
              <strong>Language:</strong> {{ movie.original_language | uppercase }}
            </p>
            <p><strong>Genres:</strong> {{ getGenres() }}</p>
            <p><strong>Popularity:</strong> {{ movie.popularity }}</p>
            <p>
              <strong>Rating:</strong> {{ movie.vote_average }} / 10 ({{
                movie.vote_count
              }}
              votes)
            </p>
          </div>
        </div>
      </div>
    </div>
  </div> `,
  styles: ``,
})
export class MovieDetailsComponent implements OnInit {
  route = inject(ActivatedRoute);
  tmdbService = inject(TMDBService);
  id!: string;
  @Input() movie: Movie = {
    adult: false,
    backdrop_path: '/uVlUu174iiKhsUGqnOSy46eIIMU.jpg',
    genre_ids: [18, 10749, 14],
    id: 402431,
    original_language: 'en',
    original_title: 'Wicked',
    overview: "In the land of Oz, ostracized and misunderstood green-skinned Elphaba is forced to share a room with the popular aristocrat Glinda at Shiz University, and the two's unlikely friendship is tested as they begin to fulfill their respective destinies as Glinda the Good and the Wicked Witch of the West.",
    popularity: 2156.489,
    poster_path: '/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg',
    release_date: '2024-11-20',
    title: 'Wicked',
    video: false,
    vote_average: 7.4,
    vote_count: 880,
    name: '',
    media_type: ''
  };

  getGenres(): string {
    const genresMap: { [key: number]: string } = {
      18: 'Drama',
      10749: 'Romance',
      14: 'Fantasy',
    };
    return this.movie.genre_ids
      .map((id: any) => genresMap[id] || 'Unknown')
      .join(', ');
  }
  constructor() {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    // this.getMovieDetails();
  }

  getMovieDetails() {
    this.tmdbService
      .getExternalIDs(Number(this.id))
      .subscribe((res) => console.log(res));
    this.tmdbService
      .getMovieDetails(Number(this.id), 'tt13186482')
      .subscribe((movie) => {
        console.log(movie);
      });
  }
}
