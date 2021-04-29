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
import * as env from 'src/environments/environment';
import { ToastService } from './toast.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  API_URL = env.environment.API_URL;
  DICTIONARY_PATH = './assets/i18n/';

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
  ) { }

  getToken = (): Observable<string> => {
    return from(this.authService.getToken());
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getToken().pipe(
      mergeMap((token: string) => {
        let copiedTokenReq = req;
        if (token) {
          copiedTokenReq = req.clone({
            headers: new HttpHeaders({
              Authorization: `Bearer ${token}`,
            }),
          });
        }
        let copiedUrlReq = copiedTokenReq;
        if (!req.url.includes(this.DICTIONARY_PATH)) {
          copiedUrlReq = copiedTokenReq.clone({
            url: `${this.API_URL}${req.url}`
          });
        }
        return new Observable<HttpEvent<any>>((subscriber) => {
          const originalRequestSubscription = next.handle(copiedUrlReq).subscribe(
            (response: any) => {
              subscriber.next(response);
            },
            ({ error }) => {
              this.toastService.presentDangerToast(error.message);
              subscriber.error(error);
            },
            () => subscriber.complete()
          );
          return () => originalRequestSubscription.unsubscribe();
        });
      })
    );
  }
}
