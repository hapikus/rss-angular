import { HttpInterceptorFn, HttpParams } from '@angular/common/http';

export const keyInterceptor: HttpInterceptorFn = (req, next) => {
  const APIKEY = 'AIzaSyDWnsMKVv9MuJaG68D9WDUa8v5yWQKWSPY';
  const authReq = req.clone({
    params: (req.params ? req.params : new HttpParams()).set('key', APIKEY),
  });
  return next(authReq);
};
