import { Component, OnInit } from '@angular/core';
import { UserServices } from '../../services/user.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { LoadingComponent } from 'src/components/loading/loading.component';
import { bootstrapPencilFill, bootstrapTrashFill, bootstrapCheckLg, bootstrapXLg } from "@ng-icons/bootstrap-icons";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LoadingComponent, NgIconComponent],
  viewProviders: [provideIcons({ bootstrapPencilFill, bootstrapTrashFill, bootstrapCheckLg, bootstrapXLg })],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit {
  userDetails: any[] = [];
  isLoader: boolean = false;
  isBtnClicked: boolean = false;

  constructor(private userService: UserServices, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.isLoader = true;
    this.userService.getForm().subscribe({
      next: (data) => {
        this.userDetails = data;
      },
      error: (error) => {
        console.error('Error fetching user details:', error);
      }
    });
    setTimeout(() => {
      this.isLoader = false;
    }, 1000);
  }

  deleteFormUser(id: string): void {
    console.log(id)
    this.isLoader = true;
    this.isBtnClicked = true;

    this.userService.deleteFormUser(id).subscribe({
      next: (res) => {
        this.toastr.success(res.message || 'User form deleted successfully');
        this.getUserDetails();
      },
      error: (error) => {
        this.toastr.error('User form cannot deleted due to some error. Please try again later.');
        console.error('Error deleting user form:', error);
      }
    });
    this.isBtnClicked = false;
    setTimeout(() => {
      this.isLoader = false;
    }, 1000);
  }
}
