import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'
import { bootstrapSearch, bootstrapHouseDoorFill, bootstrapClipboardMinusFill, bootstrapCardHeading, bootstrapCursorFill, bootstrapLayersFill, bootstrapDropbox, bootstrapGrid1x2Fill } from "@ng-icons/bootstrap-icons";
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NgIconComponent, RouterLink, RouterLinkActive, RouterOutlet, NgOptimizedImage],
  viewProviders: [provideIcons({ bootstrapSearch, bootstrapHouseDoorFill, bootstrapClipboardMinusFill, bootstrapCardHeading, bootstrapCursorFill, bootstrapLayersFill, bootstrapDropbox, bootstrapGrid1x2Fill })],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  currentUser: any;
  currentUrl: string = "";
  isPagesLinkActive: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
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
