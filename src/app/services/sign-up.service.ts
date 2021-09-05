import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  private handleError() {
    return throwError(
      {
        "status": "error",
        "message": "Invalid Subscription request."
      });
  }


  signUp(user: any): Observable<any> {
    return this.http.post(`/api/users`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

}
