import { Component } from '@angular/core';
import { ClientService } from '../client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079 },
  {position: 2, name: 'Helium', weight: 4.0026},
  {position: 3, name: 'Lithium', weight: 6.941},
  {position: 4, name: 'Beryllium', weight: 9.0122},
  {position: 5, name: 'Boron', weight: 10.811},
  
];

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})

export class FactureListComponent {

  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource = ELEMENT_DATA;
  startDate: string | null = null; // Initialize with null
  endDate: string | null = null;

  constructor(private clientService: ClientService, private datePipe: DatePipe) { }

  updateStartDate(date: Date): void {
    this.startDate = date ? date.toISOString() : null;
  }
  
  updateEndDate(date: Date): void {
    this.endDate = date ? date.toISOString() : null;
  }
  
  
  
  
  downloadPDF() {
    if (!this.startDate || !this.endDate) {
      alert('Please select both start and end dates.');
      return;
    }
  
    // Convert string dates to Date objects
    const startDateObj = new Date(this.startDate);
    const endDateObj = new Date(this.endDate);
  
    this.clientService.downloadPDF(startDateObj, endDateObj).subscribe({
      next: (response: Blob) => {
        const downloadURL = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'facture.pdf';
        link.click();
        window.URL.revokeObjectURL(downloadURL);
      },
      error: (error) => {
        console.error('Error downloading PDF:', error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 500) {
            alert('Server error. Please try again later.');
          } else if (error.status === 401) {
            alert('Unauthorized. Please check your authorization token.');
          } else {
            alert('An error occurred while downloading the PDF.');
          }
        } else {
          alert('An error occurred while downloading the PDF.');
        }
      },
    });
  }
  

    
}

