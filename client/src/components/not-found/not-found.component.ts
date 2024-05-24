import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapHouseDoorFill } from "@ng-icons/bootstrap-icons";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  viewProviders: [provideIcons({ bootstrapHouseDoorFill })],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
