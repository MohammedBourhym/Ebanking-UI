import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Customer } from '../model/customer.model';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiURL = environment.backendHost + '/customers';

  constructor(private http: HttpClient) {}

  // Get all customers
  public getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiURL).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
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

  // Get customer by ID
  public getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiURL}/${id}`);
  }

  // Update customer
  public updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiURL}/${customer.id}`, customer);
  }
}
