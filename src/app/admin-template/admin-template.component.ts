import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.css']
})
export class AdminTemplateComponent implements OnInit {

  constructor(public authService : AuthService, private router : Router){}

  ngOnInit(): void {
    
  }

  handleLogout(){
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

}
