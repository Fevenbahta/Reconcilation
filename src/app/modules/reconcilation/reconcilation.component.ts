import { outputAst } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OutRtgsAts, OutRtgsCbc, Reconciled } from 'app/models/data.model';
import { AuthService } from 'app/service/auth.service';
import { ReconcilationService } from 'app/service/reconcilation.service';
import * as ExcelJS from 'exceljs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-reconcilation',
  templateUrl: './reconcilation.component.html',
  styleUrls: ['./reconcilation.component.css']
})
export class ReconcilationComponent {
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog, private authService: AuthService,
    private reconcilationService: ReconcilationService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
  
  ) {}

  reconciledStartDate: string;
  reconciledEndDate: string;
  reconciledAccount: string;
  reconciledAmount: number;

  cbcStartDate: string;
  cbcEndDate: string;
  cbcAccount: string;
  cbcAmount: number;

  atsStartDate: string;
  atsEndDate: string;
  atsAccount: string;
  atsAmount: string;


  pageSize: number = 100;
  currentPage: number = 1;
  isSearching:boolean=false
  reconcileds:Reconciled[]=[]
  outRtgsAts:OutRtgsAts[]=[]
  outRtgsCbc:OutRtgsCbc[]=[]
  filteredReconcileds:Reconciled[]=[]
  filteredOutRtgsAts:OutRtgsAts[]=[]
  filteredOutRtgsCbc:OutRtgsCbc[]=[]

  buttons = [
     { label: 'OutReconcilation', route: '/Reconcilation', role: ['User'] },
     { label: 'OutRtgsAts', route: '/OutRtgsAts', role: ['User'] },
     { label: 'InReconcilation', route: '/InReconcilation', role: ['User'] },
     { label: 'InRtgsAts', route: '/InRtgsAts', role: ['User'] },
 
  ];


  ngOnInit(): void {
this.isSearching=true
    this.reconcilationService.getAllReconcileds().subscribe({
      next: (re) => {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.reconcileds=re;
         this.filteredReconcileds = re
        const lastlist = this.reconcileds.pop();
        this.reconcileds.unshift(lastlist);
        this.filteredReconcileds = re
      this.isSearching=false
        console.log(re);
      },
      error(response) {
        console.log(response);
      },
    });
    this.reconcilationService.getAllOutRtgsCbcs().subscribe({
      next: (re) => {
           this.outRtgsCbc=re;
         this.filteredOutRtgsCbc = re
           
        console.log(re);
      },
      error(response) {
        console.log(response);
      },
    });
    this.reconcilationService.getAllOutRtgsAtss().subscribe({
      next: (re) => {
           this.outRtgsAts=re;
         this.filteredOutRtgsAts = re
         
        console.log(re);
      },
      error(response) {
        console.log(response);
      },
    });
  }

  onNextPage() {
    this.currentPage++;
    this.updateFilteredreports();
    }
    onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredreports();
    }
    }
    private updateFilteredreports() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      
      this.filteredReconcileds = this.reconcileds.slice(startIndex, endIndex);
      }
  exportToExcel() {
    // Define headers for Excel columns (matching your HTML table)
    const headers = [
      { header: 'No', key: 'no', width: 10, alignment: { horizontal: 'left' as const } },
      { header: 'Branch', key: 'branch', width: 25, alignment: { horizontal: 'left' as const } },
      { header: 'Account', key: 'account', width: 25, alignment: { horizontal: 'left' as const } },
      { header: 'Description', key: 'discription', width: 30, alignment: { horizontal: 'left' as const } },
      { header: 'Amount', key: 'amount', width: 15, alignment: { horizontal: 'right' as const } },
      { header: 'Inputting Branch', key: 'inputinG_BRANCH', width: 25, alignment: { horizontal: 'left' as const } },
      { header: 'Date', key: 'datet', width: 20, alignment: { horizontal: 'center' as const } },
      { header: 'Type', key: 'type', width: 20, alignment: { horizontal: 'left' as const } },
      { header: 'Reference', key: 'reference', width: 25, alignment: { horizontal: 'left' as const } },
      { header: 'Debitor', key: 'debitor', width: 25, alignment: { horizontal: 'left' as const } },
      { header: 'Creditor', key: 'creditor', width: 25, alignment: { horizontal: 'left' as const } },
      { header: 'Ordering Account', key: 'orderingAccount', width: 25, alignment: { horizontal: 'left' as const } },
      { header: 'Beneficiary Account', key: 'beneficiaryAccount', width: 25, alignment: { horizontal: 'left' as const } },
      { header: 'Business Date', key: 'businessDate', width: 20, alignment: { horizontal: 'center' as const } },
      { header: 'Entry Date', key: 'entryDate', width: 20, alignment: { horizontal: 'center' as const } },
      { header: 'Currency', key: 'currency', width: 15, alignment: { horizontal: 'center' as const } },
      { header: 'Processing Status', key: 'processingStatus', width: 20, alignment: { horizontal: 'center' as const } },
      { header: 'Status', key: 'status', width: 15, alignment: { horizontal: 'center' as const } },
    ];
  
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Transaction Report');
  
    // Apply headers to worksheet columns
    worksheet.columns = headers.map(header => ({
      header: header.header,
      key: header.key,
      width: header.width,
      alignment: header.alignment,
    }));
  
    // Add title columns before the data
    const titleColumns = [
      ['', '', 'LION INTERNATIONAL BANK'],
      ['', '', 'Reconcilation REPORT'],
     
  
      [],
   //   [`Date covered: From ${this.startDate} To: ${this.endDate}`], // Include date range
    ];
  
    titleColumns.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        worksheet.getCell(rowIndex + 1, colIndex + 3).value = value; // Insert into 3rd column
        worksheet.getCell(rowIndex + 1, colIndex + 3).font = { bold: true }; // Make bold
      });
    });
  
    // Add headers to worksheet
    const headerRow = worksheet.addRow(headers.map(header => header.header));
    headerRow.font = { bold: true }; // Make headers bold
  
    // Apply data alignment and width from headers
    worksheet.columns.forEach((column, index) => {
      column.width = headers[index].width;
      column.alignment = headers[index].alignment;
    });
  
    // Add data rows to the worksheet (matching the data displayed in the HTML)
    this.filteredReconcileds.forEach((report, index) => {
      const rowData = {
        no: index + 1,
        branch: report.branch,
        account: report.account,
        discription: report.discription,
        amount: report.amount,
        inputinG_BRANCH: report.inputinG_BRANCH,
        datet: new Date(report.datet).toLocaleDateString(), // Format date as 'yyyy-MM-dd'
        type: report.type,
        reference: report.reference,
        debitor: report.debitor,
        creditor: report.creditor,
        orderingAccount: report.orderingAccount,
        beneficiaryAccount: report.beneficiaryAccount,
        businessDate: new Date(report.businessDate).toLocaleDateString(), // Format date as 'yyyy-MM-dd'
        entryDate: new Date(report.entryDate).toLocaleDateString(), // Format date as 'yyyy-MM-dd'
        currency: report.currency,
        processingStatus: report.processingStatus,
        status: report.status,
      };
      worksheet.addRow(rowData);
    });
  
    // Save the workbook or trigger download
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
  
      const fileName = 'reconcilation_report.xlsx';
      if ((navigator as any).msSaveBlob) {
        // For IE and Edge browsers
        (navigator as any).msSaveBlob(blob, fileName);
      } else {
        // For other browsers
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  }
  exportToExcelOutRtgsCbc(): void {
    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
  
    // Add the OUTRTGSCBC sheet
    const sheetCbc = workbook.addWorksheet('OUTGOING-RTGS-CBS');
    
    // Define headers for OUTRTGSCBC
    sheetCbc.columns = [
      { header: '#', key: 'index', width: 5 },
      { header: 'Reference No', key: 'refno', width: 20 },
      { header: 'Branch', key: 'branch', width: 20 },
      { header: 'Account', key: 'account', width: 20 },
      { header: 'Debitor Name', key: 'debitoR_NAME', width: 20 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Inputting Branch', key: 'inputinG_BRANCH', width: 20 },
      { header: 'Date', key: 'datet', width: 20 },
    ];
  
    // Add data to OUTRTGSCBC sheet
    this.outRtgsCbc.forEach((row, index) => {
      sheetCbc.addRow({
        index: index + 1,
        refno: row.refno,
        branch: row.branch,
        account: row.account,
        debitoR_NAME: row.debitoR_NAME,
        description: row.discription,
        amount: row.amount,
        inputinG_BRANCH: row.inputinG_BRANCH,
        datet: new Date(row.datet).toLocaleDateString(),
      });
    });
  
    // Generate the Excel file and trigger the download
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
  
      const fileName = 'OUTRTGSCBC_report.xlsx';
      
      // Browser detection for file download compatibility
      if ((navigator as any).msSaveBlob) {
        (navigator as any).msSaveBlob(blob, fileName); // For IE and Edge
      } else {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  }
  exportToExcelOutRtgsAts(): void {
    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
  
    // Add the OUTRTGSATS sheet
    const sheetAts = workbook.addWorksheet('OUTGOING-RTGS-ATS');
    
    // Define headers for OUTRTGSATS
    sheetAts.columns = [
      { header: '#', key: 'index', width: 5 },
      { header: 'Type', key: 'type', width: 20 },
      { header: 'Reference', key: 'reference', width: 20 },
      { header: 'Debitor', key: 'debitor', width: 20 },
      { header: 'Creditor', key: 'creditor', width: 20 },
      { header: 'Ordering Account', key: 'orderingAccount', width: 20 },
      { header: 'Beneficiary Account', key: 'beneficiaryAccount', width: 20 },
      { header: 'Business Date', key: 'businessDate', width: 20 },
      { header: 'Entry Date', key: 'entryDate', width: 20 },
      { header: 'Currency', key: 'currency', width: 15 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Processing Status', key: 'processingStatus', width: 20 },
      { header: 'Status', key: 'status', width: 15 },
    ];
  
    // Add data to OUTRTGSATS sheet
    this.outRtgsAts.forEach((row, index) => {
      sheetAts.addRow({
        index: index + 1,
        type: row.type,
        reference: row.reference,
        debitor: row.debitor,
        creditor: row.creditor,
        orderingAccount: row.orderingAccount,
        beneficiaryAccount: row.beneficiaryAccount,
        businessDate: new Date(row.businessDate).toLocaleDateString(),
        entryDate: new Date(row.entryDate).toLocaleDateString(),
        currency: row.currency,
        amount: row.amount,
        processingStatus: row.processingStatus,
        status: row.status,
      });
    });
  
    // Generate the Excel file and trigger the download
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
  
      const fileName = 'OUTRTGSATS_report.xlsx';
      
      // Browser detection for file download compatibility
      if ((navigator as any).msSaveBlob) {
        (navigator as any).msSaveBlob(blob, fileName); // For IE and Edge
      } else {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  }
  generateReconciliation() {
    this.ngxService.start();
   
    const addReconciliationRequest: Reconciled = {
      no: 0, // or some value
      branch: 'BranchName',
      account: 'AccountNumber',
      discription: 'Description',
      amount: 100.00,
      inputinG_BRANCH: 'InputBranch',
      datet: '2024-09-07', // Adjust to the expected date format
      type: 'Type',
      reference: 'ReferenceNumber',
      debitor: 'DebitorName',
      creditor: 'CreditorName',
      orderingAccount: 'OrderingAccountNumber',
      beneficiaryAccount: 'BeneficiaryAccountNumber',
      businessDate: "2024-09-09T06:31:01.897Z", // Use timestamp or appropriate value
      entryDate: "2024-09-09T06:31:01.897Z", // Use timestamp or appropriate value
      currency: 'CurrencyCode',
      processingStatus: 'ProcessingStatus',
      status: 'Status'
    };

    this.reconcilationService.addReconciled(addReconciliationRequest).subscribe(
      (response: Reconciled) => {
        this.reconcilationService.getAllReconcileds().subscribe({
          next: (re) => {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            this.reconcileds=re;
             this.filteredReconcileds = re
            const lastlist = this.reconcileds.pop();
            this.reconcileds.unshift(lastlist);
            this.filteredReconcileds = re
          this.isSearching=false
            console.log(re);
            this.ngxService.stop();
   
          },
          error(response) {
            console.log(response);
            this.ngxService.stop();
   
          },
        });
      },
      (error) => {
        this.ngxService.stop();
   
        console.error('Error:', error);
       }
    );
  }  
  onMultipleReconciledSearch() {
    this.ngxService.start();
   
    // Assuming filteredStartDate and filteredEndDate are in 'YYYY-MM-DD' format
    const startDate = new Date(this.reconciledStartDate);
    const endDate = new Date(this.reconciledEndDate);
    // Normalize start date to beginning of the day (00:00:00)
    startDate.setHours(0, 0, 0, 0);
    // Adjusting end date to include the full day by setting the time to 23:59:59
    endDate.setHours(23, 59, 59, 999);
  
    this.filteredReconcileds = this.reconcileds.filter(item => {
      const itemDate = new Date(item.businessDate); // Adjust based on the field you are filtering
  
      // Make sure to include both boundaries
      return itemDate >= startDate && itemDate <= endDate ||
             item.account.includes(this.reconciledAccount) ||
             item.amount === this.reconciledAmount;
    });
    this.ngxService.stop();
   
  }
  
    // Similar logic for CBC and ATS tabs
    onMultipleCBCSearch() {
      this.ngxService.start();
   
      // Convert cbcStartDate and cbcEndDate to Date objects
      const startDate = new Date(this.cbcStartDate);
      const endDate = new Date(this.cbcEndDate);
    console.log("cbcEndDate",this.cbcEndDate)
    console.log("cbcStartDate",this.cbcStartDate)
      // Normalize start date to the beginning of the day (00:00:00)
      startDate.setHours(0, 0, 0, 0);
    
      // Normalize end date to the end of the day (23:59:59)
      endDate.setHours(23, 59, 59, 999);
    
      this.filteredOutRtgsCbc = this.outRtgsCbc.filter(it => {
        const transactionDate = new Date(it.datet);
        console.log("datet",it.datet)
        console.log("transactionDate",transactionDate)
        console.log("outRtgsCbc",this.outRtgsCbc)
     
        // Check if the transaction date is within the date range, inclusive
        const isWithinDateRange = (!this.cbcStartDate || transactionDate >= startDate) &&
                                  (!this.cbcEndDate || transactionDate <= endDate);
    
        const matchesAccount = !this.cbcAccount || it.account.includes(this.cbcAccount);
        const matchesAmount = !this.cbcAmount || it.amount == this.cbcAmount;
    
        return isWithinDateRange && matchesAccount && matchesAmount;
          
      });  console.log("filteredOutRtgsCbc",this.filteredOutRtgsCbc)

      this.ngxService.stop();
   
    }
    
    onMultipleATSSearch() {
      this.ngxService.start();
   
      // Convert atsStartDate and atsEndDate to Date objects
      const startDate = new Date(this.atsStartDate);
      const endDate = new Date(this.atsEndDate);
    
      // Normalize start date to the beginning of the day (00:00:00)
      startDate.setHours(0, 0, 0, 0);
    
      // Normalize end date to the end of the day (23:59:59)
      endDate.setHours(23, 59, 59, 999);
    
      this.filteredOutRtgsAts = this.outRtgsAts.filter(it => {
        const businessDate = new Date(it.businessDate);
    
        // Check if the business date is within the date range, inclusive
        const isWithinDateRange = (!this.atsStartDate || businessDate >= startDate) &&
                                  (!this.atsEndDate || businessDate <= endDate);
    
        const matchesAccount = !this.atsAccount || it.orderingAccount.includes(this.atsAccount);
        const matchesAmount = !this.atsAmount || it.amount == this.atsAmount;
    
        return isWithinDateRange && matchesAccount && matchesAmount;
      });
      this.ngxService.stop();
   
    }
}
