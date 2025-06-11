import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { AccountDetails } from '../model/account.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Array<AccountDetails> = [];
  selectedAccount: AccountDetails | null = null;
  searchAccountId: string = '';
  currentPage: number = 0;
  pageSize: number = 5;

  constructor(
    private accountsService: AccountsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountsService.getAllAccounts().subscribe({
   
      next: data =>this.accounts=data,
      error: err => console.error('Error loading accounts:', err)
    });
   
  }

  searchAccount(): void {
    if (this.searchAccountId.trim()) {
      this.accountsService.getAccount(this.searchAccountId, this.currentPage, this.pageSize).subscribe({
        next: data => this.selectedAccount = data,
        error: err => console.error('Error searching account:', err)
      });
    }
  }

  selectAccount(account: AccountDetails): void {
    this.accountsService.getAccountHistory(account.id).subscribe({
      next: data => {this.selectedAccount = data
        console.log(data)
      },
      error: err => console.error('Error loading account details:', err)
    });
  }
}
