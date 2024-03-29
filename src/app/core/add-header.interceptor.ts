import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`AddHeaderInterceptor - ${req.url}`);

        const jsonReg: HttpRequest<any> = req.clone({
            setHeaders: {'Content-Type': 'application/json'}
        });

        return next.handle(jsonReg);
    }
}
