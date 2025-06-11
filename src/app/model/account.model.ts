export interface AccountDetails {
  id:            string;
  balance:              number;
  currentPage:          number;
  totalPages:           number;
  pageSize:             number;
  accountOperationDTOS: AccountOperation[];
}


export interface AccountDetailsOperation {
 accountId: string,
 balance:number,
 currentPage:number,
    totalPages:number,
    pageSize:number,
accountOperationDTOS:AccountOperation[]
   
}

export interface AccountOperation {
  id:            number;
  operationDate: Date;
  amount:        number;
  type:          string;
  description:   string;
}
