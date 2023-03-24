import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { HEROES } from '../mocks/mock-heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroServiceInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
    });
    // pass it on
    // return next.handle(req);

    console.log('req', req);
    return this.handleRequests(req, next);
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req;

    switch (method) {
      case 'GET': {
        if (url === 'api/heroes1') {
          return of(new HttpResponse({ status: 200, body: HEROES })).pipe(
            delay(500)
          );
        }
        return of(
          new HttpErrorResponse({
            status: 404,
            statusText: 'Not Found',
            url,
            error: 'uggggggh.',
          })
        );
      }
      case 'POST': {
        return next.handle(req);
      }
      default:
        return next.handle(req);
    }
  }
}
