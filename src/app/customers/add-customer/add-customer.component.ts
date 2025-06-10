import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../model/customer.model';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {
  newCustomer: Customer = {
    id: 0,
    name: '',
    email: ''
  };

  constructor(
    private customersService: CustomersService,
    private router: Router
  ) {}

  saveCustomer(): void {
    this.customersService.saveCustomer(this.newCustomer).subscribe({
      next: () => {
        this.router.navigateByUrl('/customers');
      },
      error: err => console.error('Error saving customer:', err)
    });
  }

  cancel(): void {
    this.router.navigateByUrl('/customers');
  }
}