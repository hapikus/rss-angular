import {
  HttpInterceptorFn,
  HttpParams,
} from '@angular/common/http';

export const addKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const APIKEY = 'AIzaSyDWnsMKVv9MuJaG68D9WDUa8v5yWQKWSPY';
  let params = new HttpParams();
  params = params.set('key', APIKEY);

  const authReq = req.clone({ params });
  return next(authReq);
};
