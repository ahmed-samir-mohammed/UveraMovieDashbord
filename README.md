# UveraMovieDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Project Overview

UveraMovieDashboard is a web application designed to display trending movies, movie details, and search functionality using the TMDB API. The application leverages Angular as the primary framework and employs modern technologies like NgRx for state management and RxJS for reactive data handling.

## Architecture

- **Feature Modules:** The application is divided into independent feature modules (e.g., Search, Trending, and Movie Details). This ensures better code management and easier feature development.
- **Shared Components:** The application includes shared components like Navbar and MovieCard to reduce redundancy.
- **State Management:** NgRx is used for centralized state management to ensure predictable behavior and easier testing.
- **Interceptor:** An HTTP Interceptor is used to add headers like Authorization to every HTTP request.
- **Lazy Loading:** Modules are lazy-loaded to enhance application performance and reduce initial load time.
- **Directives:** A custom directive was implemented to allow only numeric input fields, ensuring better data validation and UX.

## Technical Choices

- **Angular Framework:** Chosen for its robust architecture, advanced CLI tools, and built-in TypeScript support.
- **NgRx:** For centralized state management, improving performance and maintainability.
- **RxJS Signals:** To optimize performance and simplify reactive data handling.
- **NgxPagination:** To provide seamless pagination experience.
- **NgxSpinner:** To display loading indicators, enhancing user experience.
- **Tailwind CSS and Flowbite:** Used to enhance the UI design, ensuring modern and responsive user interface components with minimal custom styling required.

## Structure

```
src/
├── app/
│   ├── core/
│   │   ├── interceptors/
│   │   │   └── http.interceptor.ts
│   │   ├── directives/
│   │   │   └── only-numbers.directive.ts
│   │   ├── services/
│   │   │   └── tmdb.service.ts
│   │   ├── models/
│   │   │   ├── countries.interface.ts
│   │   │   ├── genres.interface.ts
│   │   │   ├── trend.interface.ts
│   │   │   └── movieDetails.interface.ts
│   ├── features/
│   │   ├── trending/
│   │   │   └── trending.component.ts
│   │   ├── movie-details/
│   │   │   └── movie-details.component.ts
│   │   └── search/
│   │       └── search.component.ts
│   ├── layout/
│   │   └── layout.component.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── navbar/
│   │   │   │   └── navbar.component.ts
│   │   │   └── movie-card/
│   │   │       └── movie-card.component.ts
│   ├── store/
│   │   ├── countries/
│   │   ├── genres/
│   │   └── trending/
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
