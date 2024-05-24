import { Component, HostListener, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { bootstrapPerson } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  providers: [provideIcons({bootstrapPerson})],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.css'
})
export class ProfileMenuComponent {
  @Input() user: any = {};
  isMenuOpen: boolean = false;

  constructor(private authServices: AuthService, private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!event.target) return;

    const clickedElement = event.target as HTMLElement;
    const isProfileMenuClicked = clickedElement.getAttribute('data-popover-target') === 'profile-menu';

    if (!isProfileMenuClicked) {
      this.isMenuOpen = false;
    }
  }

  logout() {
    this.authServices.logout();
    this.router.navigateByUrl('/login');
  }

}
