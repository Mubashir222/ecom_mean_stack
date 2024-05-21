import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from 'src/components/loader/loader.component';
import { LoadingComponent } from 'src/components/loading/loading.component';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [LoaderComponent, LoadingComponent],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent implements OnInit{
  usersData: any[] = [];
  contactData: any[] = [];
  isLoading: boolean = false;
  isSwap: boolean = false;

  constructor(private authServices: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.isLoading = true;
    this.getUsersData();
    this.getContactData();
    setInterval(() => {
      this.isLoading = false;
    }, 2000);
  }

  getUsersData(){
    this.authServices.getUsers().subscribe({
      next: (response) => {
        this.usersData = response;
      },error: (error) => {
        console.log(error);
      }
    });
  }
  
  getContactData(){
    this.authServices.getContactData().subscribe({
      next: (response) => {
        this.contactData = response;      
      },error: (error) => {
        console.log(error);
      }
    });
  }

  swapData(){
    this.isSwap = !this.isSwap;
  }

}
