import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from "rxjs";

import {IProduct} from "./product";
import {NgForm} from "@angular/forms";
import {environment} from "../../environments/environment";
import {
  getProductByIdQuery,
  getProductExportQuery,
  getProductsQuery,
  insertProduct
} from "../constants/webapp-query-constants";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly params: { headers: {'x-hasura-admin-secret':string}}

  constructor(
      private http: HttpClient
  ) {
    this.params = {
      headers: {
        'x-hasura-admin-secret': 'lg6xAHPKfgShb7F5Z6AdLqNcVM5kbSMRk6XVh2l0DXV6p41v1VlqyQeOcqv1Pu6e',
      }
    };
  }

  private readonly productData = new BehaviorSubject({});
  sharedProductData = this.productData.asObservable();

  getProducts(): Observable<IProduct[]> {
    return this.http.post<any>(environment.WEBAPP_API_ENDPOINT, getProductsQuery(), this.params)
        .pipe(
            tap(res => console.log('All_getProducts  are::::\n', JSON.stringify(res))),
      map(res => res.data.products),
      catchError(this.handleError)
    )
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.post<any>(environment.WEBAPP_API_ENDPOINT, getProductByIdQuery(id), this.params)
        .pipe(
            tap(res => console.log('All_getProduct', JSON.stringify(res))),
            map(res => res.data.products[0]),
            catchError(this.handleError)
        );
  }

  public getProductDetailsExport(productName: string) {
    return this.http.post<any>(environment.WEBAPP_API_ENDPOINT, getProductExportQuery(productName), this.params)
        .pipe(
            tap((res) => {
              console.log('Service 1: ProductName in Service::::', productName);
              console.log('Service 2: Inside getProductDetailsExport--ProductData::::res::::', res);}),
            map(res => res.data.products[0]),
    )
  }

  getProductCodes():Observable<string[]> {
    return of(['Tools', 'Utilities','Grocery','Others'])
  }

  postProduct(iProduct: NgForm): Observable<IProduct> {
    console.log('In post call', iProduct)
    return this.http.post<IProduct>(environment.WEBAPP_API_ENDPOINT, insertProduct(iProduct), this.params)
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
