import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
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

    return this.handleRequests(req, next);
  }

  handleRequests(req: HttpRequest<any>, next: HttpHandler): any {
    const { url, method } = req;
    if (url.endsWith('/fake') && method === 'GET') {
      return of(new HttpResponse({ status: 200, body: 'BUY' })).pipe(
        delay(500)
      );
    }
    // if there is not any matches return default request.
    return next.handle(req);
  }
}
