import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from 'src/components/loading/loading.component';
import { AuthService } from 'src/services/auth.service';
import { UserServices } from 'src/services/user.service';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent implements OnInit{
  usersData: any[] = [];
  contactData: any[] = [];
  isLoading: boolean = false;
  isSwap: boolean = true;
  isShowMessage: boolean = false;
  message: string = '';

  constructor(private userServices: UserServices, private authServices: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.isLoading = true;
    this.getUsersData();
    this.getContactData();
    setInterval(() => {
      this.isLoading = false;
    }, 1500);
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
    this.userServices.getContactData().subscribe({
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

  openPopup(msg: string){
    this.isShowMessage = true;
    this.message = msg;
  }

  closePopup(){
    this.isShowMessage = false;
    this.message = "";
  }

}
