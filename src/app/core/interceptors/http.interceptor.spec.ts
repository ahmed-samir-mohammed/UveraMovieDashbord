import { TestBed } from '@angular/core/testing';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { of } from 'rxjs';
import { HTTPInterceptor } from './http.interceptor';
import { environment } from '../../../environments/environment.development';

describe('authInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => HTTPInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add an Authorization header', () => {
    const req = new HttpRequest('GET', '/test');
    const next: HttpHandler = {
      handle: (request: HttpRequest<any>) => {
        expect(request.headers.has('Authorization')).toBeTruthy();
        expect(request.headers.get('Authorization')).toBe(
          `Bearer ${environment.TMDB_TOKEN}`
        );
        return of({} as HttpEvent<any>);
      },
    };

    interceptor(req, next.handle);
  });
});
