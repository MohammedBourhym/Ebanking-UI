import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomersService } from '../services/customers.service';
import { Customer } from '../model/customer.model';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(
    private customersService: CustomersService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    console.log('Customer component - User roles:', this.authService.getUserRoles());
    console.log('Customer component - Is admin:', this.authService.hasRole('ROLE_ADMIN'));
  }

  loadCustomers(): void {
    this.customersService.getAllCustomers().subscribe({
      next: data => this.customers = data,
      error: err => console.error('Error loading customers:', err)
    });
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customersService.deleteCustomer(id).subscribe({
        next: () => {
          this.loadCustomers();
        },
        error: err => console.error('Error deleting customer:', err)
      });
    }
  }

  editCustomer(id: number): void {
    // Navigate to edit page
    window.location.href = `/customers/edit/${id}`;
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
}