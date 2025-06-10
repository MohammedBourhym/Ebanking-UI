import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersService } from '../services/customers.service';
import { Customer } from '../model/customer.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  searchKeyword: string = '';

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customersService.getAllCustomers().subscribe({
      next: data => this.customers = data,
      error: err => console.error('Error loading customers:', err)
    });
  }

  searchCustomers(): void {
    if (this.searchKeyword.trim()) {
      this.customersService.searchCustomers(this.searchKeyword).subscribe({
        next: data => this.customers = data,
        error: err => console.error('Error searching customers:', err)
      });
    } else {
      this.loadCustomers();
    }
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customersService.deleteCustomer(id).subscribe({
        next: () => this.loadCustomers(),
        error: err => console.error('Error deleting customer:', err)
      });
    }
  }
}