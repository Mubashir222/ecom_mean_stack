import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faPen } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  faHeart = faHeart;
  faPen = faPen;
  constructor() {}
}
