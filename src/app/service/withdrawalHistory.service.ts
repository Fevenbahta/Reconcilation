import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from './apiurl.service';
import { WithdrawalHistory } from 'app/models/data.model';


@Injectable({
  providedIn: 'root'
})
export class WithdrawalHistoryService {
 
  //readonly apiUrl = 'https://localhost:7008/';
  

  constructor(private http: HttpClient,private apiUrlService: ApiUrlService) { }

  getAllWithdrawalHistorys(): Observable<WithdrawalHistory[]> {
    return this.http.get<WithdrawalHistory[]>(this.apiUrlService.apiUrl + 'Withdrawal');
  }
  getWithdrawalHistory(id:number): Observable<WithdrawalHistory> {
     return this.http.get<WithdrawalHistory>(this.apiUrlService.apiUrl + 'Withdrawal/'+id);
  }

  addWithdrawalHistory(addWithdrawalHistoryRequest:WithdrawalHistory): Observable<WithdrawalHistory> {
    // addWithdrawalHistoryRequest.id="0000000-0000-0000-0000-000000000000"
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<WithdrawalHistory>(this.apiUrlService.apiUrl + 'Withdrawal', addWithdrawalHistoryRequest,httpOptions);
  }

  updateWithdrawalHistory(WithdrawalHistoryDetails: WithdrawalHistory,Id:number): Observable<WithdrawalHistory> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<WithdrawalHistory>(this.apiUrlService.apiUrl + 'Withdrawal/'+Id, WithdrawalHistoryDetails, httpOptions);
  }

  deleteWithdrawalHistory(Id: string): Observable<string> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<string>(this.apiUrlService.apiUrl + 'Withdrawal/' + Id+'/' , httpOptions);
  }

  

}
