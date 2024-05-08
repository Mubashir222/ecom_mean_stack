import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import {faHome, faRectangleList, faAddressCard, faMagnifyingGlass, faChartPie, faArrowPointer, faLayerGroup, faTable, faPager} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive, RouterOutlet, NgOptimizedImage],

  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  currentUser: any;
  currentUrl: string;
  faHome = faHome;
  faRectangleList = faRectangleList;
  faAddressCard = faAddressCard;
  faChartPie = faChartPie;
  faArrowPointer = faArrowPointer;
  faLayerGroup = faLayerGroup;
  faTable = faTable;
  faPager = faPager;
  faMagnifyingGlass = faMagnifyingGlass;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUrl = this.router.url;
    // Subscribe to router events to update currentUrl when navigation occurs
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }


  ngOnInit() {
    this.currentUser = this.authService.getUser();
  }
}
