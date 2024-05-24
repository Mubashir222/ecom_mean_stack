import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AddProductComponent } from 'src/components/add-product/add-product.component';
import { EditProductComponent } from 'src/components/edit-product/edit-product.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
