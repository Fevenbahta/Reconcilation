import { Component } from '@angular/core';
import { ReconcilationService } from 'app/service/reconcilation.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-out-rtgs-ats',
  templateUrl: './out-rtgs-ats.component.html',
  styleUrls: ['./out-rtgs-ats.component.css']
})
export class OutRtgsAtsComponent {
  selectedFile: File | null = null;
  message: string = '';

 
  buttons = [
    { label: 'OutReconcilation', route: '/Reconcilation', role: ['User'] },
    { label: 'OutRtgsAts', route: '/OutRtgsAts', role: ['User'] },
    { label: 'InReconcilation', route: '/InReconcilation', role: ['User'] },
    { label: 'InRtgsAts', route: '/InRtgsAts', role: ['User'] },

 ];

  constructor(private outRtgsAtsService: ReconcilationService, 
    private ngxService: NgxUiLoaderService,
  ) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.message = ''; // Clear previous messages
    }
  }

  uploadFile(): void {
    this.ngxService.start();
   
    if (!this.selectedFile) {
      this.message = 'Please select a file before uploading.';
      setTimeout(() => {
        this.message = '';
      }, 2000);
      this.ngxService.stop();
   
      return;
    }

    this.outRtgsAtsService.importExcel(this.selectedFile).subscribe(
      (response) => {
        this.message = 'File uploaded successfully!';
        setTimeout(() => {
          this.message = '';
        }, 2000);
        this.selectedFile=null
        this.ngxService.stop();
   
      },
      (error) => {
        this.ngxService.stop();
   
        this.message = 'Error uploading file.';
        setTimeout(() => {
          this.message = '';
        }, 2000);

      }
    );
  }
}
