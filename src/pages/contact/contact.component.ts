import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from 'src/components/loader/loader.component';
import { LoadingComponent } from 'src/components/loading/loading.component';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, LoaderComponent, LoadingComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
  contactForm: ContactModel;
  isLoading: boolean = false;
  isSubmitted: boolean = false;

  constructor(private authServices: AuthService, private toastr: ToastrService) {
    this.contactForm = new ContactModel();
  }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  submitForm(event: Event): void {
    event.preventDefault(); // Prevent default form submission

    if(this.contactForm.name === '' || this.contactForm.email === '' || this.contactForm.subject === '' || this.contactForm.message === '') {
      this.toastr.error('All fields are required');
      return;
    }
    this.isSubmitted = true;
    this.authServices.storeContact(this.contactForm).subscribe({
      next: (response) => {
        this.contactForm = new ContactModel();
        this.toastr.success(response.message);
      }, error: (error) => {
        this.toastr.error(error.error.message || 'An error occurred. Please try again later.');
      }
    });
    setInterval(() => {
      this.isSubmitted = false;
    }, 1500);
  }

}


class ContactModel {
  name: string;
  email: string;
  subject: string;
  message: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }
}