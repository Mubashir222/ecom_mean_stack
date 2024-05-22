import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from 'src/components/loader/loader.component';
import { LoadingComponent } from 'src/components/loading/loading.component';
import { UserServices } from 'src/services/user.services';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, LoadingComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: ContactModel;
  isLoading: boolean = false;

  constructor(private userServices: UserServices, private toastr: ToastrService) {
    this.contactForm = new ContactModel();
  }

  submitForm(event: Event): void {
    event.preventDefault();

    if(this.contactForm.name === '' || this.contactForm.email === '' || this.contactForm.subject === '' || this.contactForm.message === '') {
      this.toastr.error('All fields are required');
      return;
    }

    this.isLoading = true;

    this.userServices.storeContact(this.contactForm).subscribe({
      next: (response) => {
        this.contactForm = new ContactModel();
        this.toastr.success(response.message);
      }, error: (error) => {
        this.toastr.error(error.error.message || 'An error occurred. Please try again later.');
      }
    });
    setInterval(() => {
      this.isLoading = false;
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