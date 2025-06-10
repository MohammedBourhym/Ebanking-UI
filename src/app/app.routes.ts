import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { AccountsComponent } from './accounts/accounts.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'customers/add', component: AddCustomerComponent },
  { path: 'customers/edit/:id', component: AddCustomerComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
