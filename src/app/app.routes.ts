import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';

export const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/add', component: AddCustomerComponent },
  { path: 'customers/edit/:id', component: AddCustomerComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' }
];
