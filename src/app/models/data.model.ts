export interface Transaction {
  id:number;
  empId: string;
 branchId: String;
 equipType:String;
 equipDes:String;
 equipID:String;
 
 date:string;
 remark:String;
 updatedBy:string;
 updatedDate:String;
 status:string
}


export interface Login {
  id: number;
  branch: string;
 fullName: string;
  userName: string;
  password: String;
  role: String;
  branchCode:string
  updatedBy:string;
  updatedDate:String;
  status:string
}
export interface TokenResponse {
  token: string;
userData:{
  id: number;
  branch: string;
 fullName: string;
  userName: string;
  password: string;
  role: string;
  branchCode:string
  updatedBy:string;
  updatedDate:String;
  status:string
}  

}

export interface UserData {
  branch:number;
   branchName:number;
   userName:number ;
  fullName:string;
  role :string;
  createdDate:string; 
  updatedDate :string;
status:string

}
export interface Report {
  AccountNo:number;
   SerialNo:number;
   MemberCode:number ;
  MemberType:string;
  TransactionDate :string;
  AccountHolderName:string; 
  AccountType :string;
  Debit :number;
  Credit :number;
  Balance :number;
  BBF :number;
 UnAuthorized :string;
 SiteCode:number ;

}
export interface Transfer {
  id:number,
  memberId: string;
depositorPhone: string;
  amount: number;
  transType:string;
  transDate:string;
  createdBy:string;
  approvedBy:string;
  status:string;
  updatedDate:string;
  updatedBy:string;
  cAccountNo: string,
  cAccountOwner: string,
  dAccountNo: string,
  dDepositeName: string,
 branch: string,
  referenceNo: string,
  messsageNo: string,
  paymentNo: string,

}

export interface ValidAccount {
  customer_Id: string;
  fulL_NAME: string;
  accountNumber: string;
  branch: string;
  telephonenumber: string;

}


export interface Withdrawal{
  inputing_Branch: string;
  front_User: string;
  cust_Id: string;
  full_Name: string;
  acc_No: string;
  total_Withdrawals: string;
 
}
export interface WithdrawalHistory{
  inputing_Branch: string;
  front_User: string;
  cust_Id: string;
  full_Name: string;
  acc_No: string;
  total_Withdrawals: string;
   txn_Date:string;
}

export interface Reconciled {
no: number,
  branch: string,
  account: string,
  discription: string,
  amount: number,
  inputinG_BRANCH: string,
  datet: string,
  type: string,
  reference: string,
  debitor: string,
  creditor: string,
  orderingAccount: string,
  beneficiaryAccount: string,
  businessDate: string,
  entryDate: string,
  currency: string,
  processingStatus: string,
  status: string
}
export interface OutRtgsAts {
  no: number,
  type: string,
  reference: string,
  debitor: string,
  creditor: string,
  orderingAccount: string,
  beneficiaryAccount: string,
  businessDate: number,
  entryDate: number,
  currency: string,
  amount: string,
  processingStatus: string,
  status: string
}
export interface OutRtgsCbc {
refno: string,
  branch: string,
  account: string,
  debitoR_NAME: string,
  discription: string,
  amount: number,
  inputinG_BRANCH: string,
  datet: string
}
export interface InReconciled {
  no: number,
    branch: string,
    account: string,
    discription: string,
    amount: number,
    inputinG_BRANCH: string,
    transactioN_DATE: string,
    type: string,
    reference: string,
    debitor: string,
    creditor: string,
    orderingAccount: string,
    beneficiaryAccount: string,
    businessDate: string,
    entryDate: string,
    currency: string,
    processingStatus: string,
    status: string
  }
  export interface InRtgsAts {
    no: number,
    type: string,
    reference: string,
    debitor: string,
    creditor: string,
    orderingAccount: string,
    beneficiaryAccount: string,
    businessDate: number,
    entryDate: number,
    currency: string,
    amount: string,
    processingStatus: string,
    status: string
  }


  export interface InRtgsCbc {
  refno: string,
    branch: string,
    account: string,
    debitoR_NAME: string,
    discription: string,
    amount: number,
    inputinG_BRANCH: string,
    transactioN_DATE: string
  }