import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'
import { bootstrapSearch, bootstrapHouseDoorFill, bootstrapClipboardMinusFill, bootstrapCardHeading, bootstrapCursorFill, bootstrapLayersFill, bootstrapDropbox, bootstrapGrid1x2Fill } from "@ng-icons/bootstrap-icons";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NgIconComponent, RouterLink, RouterLinkActive, RouterOutlet, NgOptimizedImage],
  viewProviders: [provideIcons({ bootstrapSearch, bootstrapHouseDoorFill, bootstrapClipboardMinusFill, bootstrapCardHeading, bootstrapCursorFill, bootstrapLayersFill, bootstrapDropbox, bootstrapGrid1x2Fill })],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  currentUser: any;
  currentUrl: string;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUrl = this.router.url;
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }


  ngOnInit() {
    this.currentUser = this.authService.getUser();
  }
}
