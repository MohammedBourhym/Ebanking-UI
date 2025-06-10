import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../model/customer.model';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customerId: number = 0;
  isEditMode: boolean = false;
  formTitle: string = 'Add New Customer';
  submitButtonText: string = 'Save';
  
  newCustomer: Customer = {
    id: 0,
    name: '',
    email: ''
  };

  constructor(
    private customersService: CustomersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check if we have an ID parameter in the route
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.customerId = +params['id'];
        this.isEditMode = true;
        this.formTitle = 'Update Customer';
        this.submitButtonText = 'Update';
        this.loadCustomer();
      }
    });
  }

  loadCustomer(): void {
    this.customersService.getCustomer(this.customerId).subscribe({
      next: (data) => {
        this.newCustomer = data;
      },
      error: (err) => console.error('Error loading customer:', err)
    });
  }

  saveCustomer(): void {
    if (this.isEditMode) {
      this.customersService.updateCustomer(this.newCustomer).subscribe({
        next: () => {
          this.router.navigateByUrl('/customers');
        },
        error: err => console.error('Error updating customer:', err)
      });
    } else {
      this.customersService.saveCustomer(this.newCustomer).subscribe({
        next: () => {
          this.router.navigateByUrl('/customers');
        },
        error: err => console.error('Error saving customer:', err)
      });
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/customers');
  }
}
