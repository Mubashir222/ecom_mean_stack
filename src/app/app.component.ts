import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive, RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { LoaderComponent } from 'src/components/loader/loader.component';
import {CloudinaryModule} from "@cloudinary/ng"
import {Cloudinary} from "@cloudinary/url-gen"
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CloudinaryModule, RouterLink, RouterLinkActive, RouterModule, FormsModule, HttpClientModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Angular Blogs';
  isLoading: boolean = true;

  constructor() {}
  
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
