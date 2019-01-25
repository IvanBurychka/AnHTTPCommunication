import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { allBooks, allReaders } from 'app/data';
import { Reader } from 'app/models/reader';
import { Book } from 'app/models/book';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { OldBook } from 'app/models/oldBook';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class DataService {

  mostPopularBook: Book = allBooks[0];

  constructor(private http: HttpClient) { }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('api/books')
  }

  getBookById(id: number): Observable<Book> {
    const getHeaders: HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'my-token'
    });

    return this.http.get<Book>(`api/books/${id}`, {headers: getHeaders});
  }

  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`api/books/${id}`)
            .pipe(
              map(b => <OldBook>{
                bookTitle: b.title,
                year: b.publicationYear
              }),
              tap(classicBook => { console.log(classicBook) })
            );
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', newBook, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  updateBook(updatedBook: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${updatedBook.bookID}`, updatedBook, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }
}