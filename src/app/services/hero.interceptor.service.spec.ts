import { TestBed } from '@angular/core/testing';

import { HeroServiceInterceptor } from './hero.interceptor.service';

describe('InterceptorService', () => {
  let service: HeroServiceInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroServiceInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
