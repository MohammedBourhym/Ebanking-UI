import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private apiURL = environment.backendHost + '/accounts';

  constructor(private http: HttpClient) {}

  // Get account details with paginated operations
  public getAccount(accountId: string, page: number, size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(`${this.apiURL}/${accountId}/pageOperations?page=${page}&size=${size}`);
  }

  // Debit an account
  public debit(accountId: string, amount: number, description: string): Observable<any> {
    const data = { accountId, amount, description };
    return this.http.post(`${this.apiURL}/debit`, data);
  }

  // Credit an account
  public credit(accountId: string, amount: number, description: string): Observable<any> {
    const data = { accountId, amount, description };
    return this.http.post(`${this.apiURL}/credit`, data);
  }

  // Transfer between accounts
  public transfer(accountSource: string, accountDestination: string, amount: number, description: string): Observable<any> {
    const data = { accountSource, accountDestination, amount, description };
    return this.http.post(`${this.apiURL}/transfer`, data);
  }
}