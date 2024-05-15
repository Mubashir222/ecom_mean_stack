import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from 'src/components/loader/loader.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit{
  isLoader = false;

  constructor() { }

  ngOnInit(): void {
    this.isLoader = true;
    setTimeout(() => {
      this.isLoader = false;
    }, 1000);
  }
}
