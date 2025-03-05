import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from './apiurl.service';
import { Withdrawal, WithdrawalHistory } from 'app/models/data.model'; // Ensure you have these models defined

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {
 
  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) { }

  getAllWithdrawals(): Observable<Withdrawal[]> {
    return this.http.get<Withdrawal[]>(this.apiUrlService.apiUrl + 'Withdrawal/GetWithdrawal');
  }
  // New Methods
  getWithdrawalLimitsByAmount(amount: number): Observable<Withdrawal[]> {
    const params = new HttpParams().set('amount', amount.toString());
    return this.http.get<Withdrawal[]>(this.apiUrlService.apiUrl+ 'Withdrawal/ByAmount', { params });
      
  }
  


  GetWithdrawalLimitsByCustomerId(custId: string): Observable<Withdrawal[]> {
    const params = new HttpParams().set('custId', custId);
    return this.http.get<Withdrawal[]>(this.apiUrlService.apiUrl + 'Withdrawal/GetWithdrawalLimitsByCustomerId', { params });
  }

  getWithdrawalLimitsByAccountNumber(accountNumber: string): Observable<Withdrawal[]> {
    const params = new HttpParams().set('accountNumber', accountNumber);
    return this.http.get<Withdrawal[]>(this.apiUrlService.apiUrl + 'Withdrawal/GetWithdrawalLimitsByAccountNumber', { params });
  }

  getWithdrawalLimitHistory(startDate: string, endDate: string): Observable<WithdrawalHistory[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<WithdrawalHistory[]>(this.apiUrlService.apiUrl + 'WithdrawalHistory/GetWithdrawalLimitHistory', { params });
  }

  getWithdrawalLimitHistoryByCustomerId(customerId: string, startDate: string, endDate: string): Observable<WithdrawalHistory[]> {
    const params = new HttpParams()
      .set('customerId', customerId)
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<WithdrawalHistory[]>(this.apiUrlService.apiUrl + 'WithdrawalHistory/GetWithdrawalLimitHistoryByCustomerId', { params });
  }

  getWithdrawalLimitHistoryByAccountNumber(accountNumber: string, startDate: string, endDate: string): Observable<WithdrawalHistory[]> {
    const params = new HttpParams()
      .set('accountNumber', accountNumber)
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<WithdrawalHistory[]>(this.apiUrlService.apiUrl + 'WithdrawalHistory/GetWithdrawalLimitHistoryByAccountNumber', { params });
  }
}
