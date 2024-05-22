import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive, RouterOutlet, RouterLink, RouterModule } from '@angular/router';
import { LoaderComponent } from 'src/components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterModule, FormsModule, HttpClientModule, LoaderComponent],
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
