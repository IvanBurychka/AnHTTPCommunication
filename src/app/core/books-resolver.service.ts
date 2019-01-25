import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { BookTrackerError } from 'app/models/bookTrackerError';
import { Book } from 'app/models/book';
import { Observable } from 'rxjs/Observable';
import { DataService } from './data.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Injectable()
export class BooksResolverService implements Resolve<Book[] | BookTrackerError> {

    constructor (private dataService: DataService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[] | BookTrackerError> {
        return this.dataService.getAllBooks()
                .pipe(
                    catchError(err => of(err))
                );
    }
}
