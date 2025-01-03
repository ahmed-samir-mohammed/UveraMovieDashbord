import { Routes } from '@angular/router';
import { TrendingComponent } from './features/trending/trending.component';
import { MovieDetailsComponent } from './features/movie-details/movie-details.component';
import { SearchComponent } from './features/search/search.component';

export const routes: Routes = [
  { path: '', component: TrendingComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'search', component: SearchComponent },
];
