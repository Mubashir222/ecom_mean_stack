import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  @Input() containerHeight: string;

  constructor() {
    this.containerHeight = "80vh";
  }
}
