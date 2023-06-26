import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable, catchError, tap, throwError, of} from "rxjs";

import { IProduct } from "./product";
import {NgForm} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productUrl ='http://localhost:3000/api/v1/webapp/getProduct/';
  public productsUrl = 'http://localhost:3000/api/v1/webapp/getAllProducts';
  public postProductUrl = 'http://localhost:3000/api/v1/webapp/saveProduct';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers : {
      'content-type': 'application/json',
      'x-hasura-admin-secret': 'lg6xAHPKfgShb7F5Z6AdLqNcVM5kbSMRk6XVh2l0DXV6p41v1VlqyQeOcqv1Pu6e',
    }
  };

  getProductCodes():Observable<string[]> {
    return of(['Tools', 'Utilities','Grocery','Others'])
  }

  getProduct(id:number): Observable<IProduct> {
    return this.http.get<IProduct>(this.productUrl+id, this.httpOptions).pipe(tap(data => console.log('All_getProduct', JSON.stringify(data))),
        catchError(this.handleError)
    )
  }

  getProducts(): Observable<IProduct[]> {
    console.log('getProducts details are::::');
    return this.http.get<IProduct[]>(this.productsUrl, this.httpOptions).pipe(tap(data => console.log('All_getProducts  are::::\n', JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

  postProduct(iProduct: NgForm): Observable<IProduct> {
    console.log('In post call', iProduct)
    return this.http.post<IProduct>(this.postProductUrl,iProduct, this.httpOptions)
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
