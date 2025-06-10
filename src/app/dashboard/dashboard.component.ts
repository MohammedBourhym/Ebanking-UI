import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { Chart, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AccountsService } from '../services/accounts.service';
import { CustomersService } from '../services/customers.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  totalCustomers: number = 0;
  totalAccounts: number = 0;
  totalBalance: number = 0;

  // Chart types
  public barChartType = 'bar' as const;
  public pieChartType = 'pie' as const;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Total Customers', 'Total Accounts'],
    datasets: [{
      data: [0, 0],
      label: 'Count',
      backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
      borderWidth: 1
    }]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Customers and Accounts Overview'
      }
    }
  };

  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Balance < 1000€', 'Balance ≥ 1000€'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
      borderWidth: 1
    }]
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Account Balance Distribution'
      }
    }
  };

  constructor(
    private accountsService: AccountsService,
    private customersService: CustomersService
  ) {}

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    forkJoin({
      customers: this.customersService.getAllCustomers(),
      accounts: this.accountsService.getAllAccounts()
    }).subscribe({
      next: (data) => {
        // Update totals
        this.totalCustomers = data.customers.length;
        this.totalAccounts = data.accounts.length;
        this.totalBalance = data.accounts.reduce((sum, acc) => sum + acc.balance, 0);

        // Update bar chart
        this.barChartData.datasets[0].data = [
          this.totalCustomers,
          this.totalAccounts
        ];

        // For the pie chart, split based on balance ranges
        const lowBalanceAccounts = data.accounts.filter(acc => acc.balance < 1000).length;
        const highBalanceAccounts = data.accounts.filter(acc => acc.balance >= 1000).length;

        // Update pie chart
        this.pieChartData.datasets[0].data = [lowBalanceAccounts, highBalanceAccounts];

        // Update charts
        this.chart?.update();
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }
}
