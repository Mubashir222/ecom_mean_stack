import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faPen } from "@fortawesome/free-solid-svg-icons"
import { LoaderComponent } from 'src/components/loader/loader.component';


@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [FontAwesomeModule, LoaderComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent implements OnInit {
  faHeart = faHeart;
  faPen = faPen;
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  constructor() {}
}
