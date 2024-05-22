import { Component } from '@angular/core';
import { heroHeart, heroPencil } from '@ng-icons/heroicons/outline';
import { LoaderComponent } from 'src/components/loader/loader.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [NgIconComponent, LoaderComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
  viewProviders: [provideIcons({ heroHeart, heroPencil })]
})
export class ButtonsComponent {
  constructor() {}
}
