import { HttpInterceptorFn, HttpParams } from '@angular/common/http';

export const keyInterceptor: HttpInterceptorFn = (req, next) => {
  const BASE_URL = 'https://www.googleapis.com/youtube/v3';
  const APIKEY = 'AIzaSyDWnsMKVv9MuJaG68D9WDUa8v5yWQKWSPY';
  const authReq = req.clone({
    url: `${BASE_URL}${req.url}`,
    params: (req.params ? req.params : new HttpParams()).set('key', APIKEY),
  });
  return next(authReq);
};
