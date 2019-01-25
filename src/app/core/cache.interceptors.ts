import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpCacheService } from './http-cache.service';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';


@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    constructor(private cacheService: HttpCacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.method !== 'GET') {
            console.log(`Invalidating cache: ${req.method} ${req.url}`);
            this.cacheService.invalidateCache();
            return next.handle(req);
        }

        const cacheResponse: HttpResponse<any> = this.cacheService.get(req.url);

        if (cacheResponse) {
            console.log(`Returning a cached responce: ${cacheResponse.url}`);
            console.log(cacheResponse.url);
            return of(cacheResponse);
        }

        return next.handle(req)
                .pipe(
                    tap(event => {
                        if (event instanceof HttpResponse) {
                            console.log(`Adding item to cache: ${req.url}`);
                            this.cacheService.put(req.url, event);
                        }
                    })
                )
    }
}
