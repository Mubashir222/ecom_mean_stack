import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() loaderDivHeight: string;

  constructor() {
    this.loaderDivHeight = "80vh";
  }
}
