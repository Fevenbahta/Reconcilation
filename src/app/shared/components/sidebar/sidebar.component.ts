
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'app/service/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/user:id', title: 'Blacklist',  icon: '', class: '' },
   
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  display:boolean=false
  constructor(private authService: AuthService) {
    this.menuItems = [];
  }
user:String;
  ngOnInit() {
this.user= this.authService.getres().userName;
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    if (true) {
      console.log("user admin") 
       this.display=true; // Allow navigation to /user/:id if user is authenticated
     }
  }
  
  
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
