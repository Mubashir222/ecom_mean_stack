import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoaderComponent } from 'src/components/loader/loader.component';
import { LoadingComponent } from 'src/components/loading/loading.component';
import { UserServices } from '../../services/user.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, LoadingComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  currentUser: any;
  isLoading: boolean = false;

  constructor(private userServices: UserServices,private formBuilder: FormBuilder, private authServices: AuthService, private toastr: ToastrService) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.setUserData();
  }

  setUserData(){
    this.authServices.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.contactForm.patchValue({
      name: this.currentUser.username,
      email: this.currentUser.email,
    })
  }

  submitForm(event: Event): void {
    event.preventDefault();

    if(this.contactForm.value.name === '' || this.contactForm.value.email === '' || this.contactForm.value.subject === '' || this.contactForm.value.message === '') {
      this.toastr.error('All fields are required');
      return;
    }

    this.isLoading = true;

    this.userServices.storeContact(this.contactForm.value).subscribe({
      next: (response) => {
        this.toastr.success(response.message);
        this.contactForm.reset();
      }, error: (error) => {
        this.toastr.error(error.error.message || 'An error occurred. Please try again later.');
      }
    });
    setInterval(() => {
      this.isLoading = false;
    }, 1500);
  }

}
