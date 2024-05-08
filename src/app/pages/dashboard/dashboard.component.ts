import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../services/user.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  userDetails: any;

  constructor(private userService: UserServices) { }

  ngOnInit(): void {
    this.getUserDetails();
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
