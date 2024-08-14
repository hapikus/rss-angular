import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const keyInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    url: `${environment.BASE_URL}/${req.url}`,
    params: (req.params ? req.params : new HttpParams()).set('key', environment.APIKEY),
  });
  return next(authReq);
};
