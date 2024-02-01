import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

export const defaultLang: string = 'en';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  constructor(private translateService: TranslateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const languageReq = req.clone({
      headers: req.headers.set('Accept-Language', this.translateService.currentLang ?? defaultLang)
    });

    return next.handle(languageReq);
  }
}
