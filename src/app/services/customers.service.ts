import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../model/customer.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiURL = environment.backendHost + '/customers';

  constructor(private http: HttpClient) {}

  // Get all customers
  public getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiURL);
  }

  // Search customers by keyword
  public searchCustomers(keyword: string): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiURL}/search?keyword=${keyword}`);
  }

  // Save new customer
  public saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiURL, customer);
  }

  // Delete customer by ID
  public deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
