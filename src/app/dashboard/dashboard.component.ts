import { Component, OnInit } from '@angular/core';
import { UserServices } from '../services/user.services';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from 'src/components/loader/loader.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  userDetails: any;
  isLoader = false;

  constructor(private userService: UserServices) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.isLoader = true;
    setTimeout(() => {
      this.isLoader = false;
    }, 1000);
  }

  getUserDetails(): void {
    this.userService.getForm().subscribe({
      next: (data) => {
        this.userDetails = data;
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
  }
}
