import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable()
export class RegisterInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  getTemporaryToken = (): Observable<string> => {
    return from(this.authService.getTemporaryToken());
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getTemporaryToken().pipe(
      mergeMap((temporaryToken: string) => {
        let copiedReq = req;
        if (temporaryToken) {
          copiedReq = req.clone({
            headers: new HttpHeaders({
              authorization: `Bearer ${temporaryToken}`,
            }),
          });
        }
        return new Observable<HttpEvent<any>>((subscriber) => {
          const originalRequestSubscription = next.handle(copiedReq).subscribe(
            (response: any) => {
              subscriber.next(response);
            },
            (err) => {
              subscriber.error(err);
            },
            () => subscriber.complete()
          );
          return () => originalRequestSubscription.unsubscribe();
        });
      })
    );
  }
}
