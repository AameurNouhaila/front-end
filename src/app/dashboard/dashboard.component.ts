import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  kibanaEmbedURL: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    
    const unsafeURL = 'http://localhost:5601/goto/67404110-4199-11ee-a66e-67aef3548d0b?embed=true';
    this.kibanaEmbedURL = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeURL);
  }

  ngOnInit(): void {
  }

}
