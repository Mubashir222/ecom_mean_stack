import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'
import { bootstrapSearch, bootstrapHouseDoorFill, bootstrapClipboardMinusFill, bootstrapCardHeading, bootstrapCursorFill, bootstrapLayersFill, bootstrapDropbox, bootstrapGrid1x2Fill, bootstrapBoxes } from "@ng-icons/bootstrap-icons";
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
import { ProfileMenuComponent } from 'src/components/profile-menu/profile-menu.component';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NgIconComponent, RouterLink, RouterLinkActive, RouterOutlet, NgOptimizedImage, ProfileMenuComponent],
  viewProviders: [provideIcons({ bootstrapSearch, bootstrapBoxes, bootstrapHouseDoorFill, bootstrapClipboardMinusFill, bootstrapCardHeading, bootstrapCursorFill, bootstrapLayersFill, bootstrapDropbox, bootstrapGrid1x2Fill })],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  currentUser: any;
  currentUrl: string = "";
  isPagesLinkActive: boolean = false;
  isProductLinkActive: boolean = false;
  isActiveInput: boolean = false;

  constructor(private router: Router, private authServices: AuthService) {
    if(this.router.url.includes('pages')) {
      this.isPagesLinkActive = true;
    } else {
      this.isPagesLinkActive = false;
    }
    if(this.router.url.includes('product')) {
      this.isProductLinkActive = true;
    } else {
      this.isProductLinkActive = false;
    }
  }

  ngOnInit() {
    this.authServices.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if(this.router.url.includes('pages')) {
        this.isPagesLinkActive = true;
      } else {
        this.isPagesLinkActive = false;
      }
    });
  }

}
