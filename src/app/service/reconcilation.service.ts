import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiUrlService } from './apiurl.service';
import { InReconciled, InRtgsAts, InRtgsCbc, Reconciled } from 'app/models/data.model';
import { OutRtgsAts } from 'app/models/data.model';
import { OutRtgsCbc } from 'app/models/data.model';
@Injectable({
  providedIn: 'root'
})
export class ReconcilationService {
 
  //readonly apiUrl = 'https://localhost:7008/';
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllReconcileds(): Observable<Reconciled[]> {
    return this.http.get<Reconciled[]>(this.apiUrlService.apiUrl + 'OutReconciled');
  }
  getAllOutRtgsAtss(): Observable<OutRtgsAts[]> {
    return this.http.get<OutRtgsAts[]>(this.apiUrlService.apiUrl + 'OutRtgsAts');
  }
  getAllOutRtgsCbcs(): Observable<OutRtgsCbc[]> {
    return this.http.get<OutRtgsCbc[]>(this.apiUrlService.apiUrl + 'OutRtgsCbc');
  }

  // importExcel(file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  

  //   return this.http.post(`${this.apiUrlService.apiUrl}OutRtgsAts/import`, formData);
  // }
  importExcel(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);  // Append the file to the form data

    const httpOptions = {
      headers: new HttpHeaders({
        // Ensure multipart form data
        'Accept': 'application/json',
      }),
      reportProgress: true, // Enable tracking upload progress
      observe: 'events' as 'body', // Return events such as progress
    };

    return this.http.post<HttpEvent<any>>(`${this.apiUrlService.apiUrl}OutRtgsAts/import`, formData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }





  getAllInReconcileds(): Observable<InReconciled[]> {
    return this.http.get<InReconciled[]>(this.apiUrlService.apiUrl + 'InReconciled');
  }
  getAllInRtgsAtss(): Observable<InRtgsAts[]> {
    return this.http.get<InRtgsAts[]>(this.apiUrlService.apiUrl + 'InRtgsAts');
  }
  getAllInRtgsCbcs(): Observable<InRtgsCbc[]> {
    return this.http.get<InRtgsCbc[]>(this.apiUrlService.apiUrl + 'InRtgsCbc');
  }

  // importExcel(file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  

  //   return this.http.post(`${this.apiUrlService.apiUrl}OutRtgsAts/import`, formData);
  // }
  importExcelForIncoming(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);  // Append the file to the form data

    const httpOptions = {
      headers: new HttpHeaders({
        // Ensure multipart form data
        'Accept': 'application/json',
      }),
      reportProgress: true, // Enable tracking upload progress
      observe: 'events' as 'body', // Return events such as progress
    };

    return this.http.post<HttpEvent<any>>(`${this.apiUrlService.apiUrl}InRtgsAts/import`, formData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handler
  private handleError(error: HttpErrorResponse) {
    console.error('Upload failed:', error);
    return throwError(() => new Error('File upload failed. Please try again.'));
  }

  getReconcilation(id:number): Observable<Reconciled> {
    return this.http.get<Reconciled>(this.apiUrlService.apiUrl + 'Reconcilation/'+id);
 }
  addReconciled(addReconcilationRequest:Reconciled): Observable<Reconciled> {
    // addReconcilationRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Reconciled>(this.apiUrlService.apiUrl + 'OutReconciled', addReconcilationRequest,httpOptions);
  }

  

}
