import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/trending/trending.component').then(
            (c) => c.TrendingComponent
          ),
      },
      {
        path: 'movie/:id',
        loadComponent: () =>
          import('./features/movie-details/movie-details.component').then(
            (c) => c.MovieDetailsComponent
          ),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('./features/search/search.component').then(
            (c) => c.SearchComponent
          ),
      },
    ]
  }
];
