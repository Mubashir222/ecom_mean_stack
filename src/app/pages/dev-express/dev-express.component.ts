import { Component } from '@angular/core';
import { DevExpressService } from './dev-express.serivce';
import { DxBulletModule, DxDataGridModule } from 'devextreme-angular';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-dev-express',
  standalone: true,
  imports: [DxDataGridModule, DxBulletModule, ChartComponent],
  templateUrl: './dev-express.component.html',
  styleUrl: './dev-express.component.css'
})
export class DevExpressComponent {
  productsData: any[] = [];

  constructor(private devExpressService: DevExpressService) {
    this.getDataSource();
  }

  customizeTooltip = ({ originalValue }: Record<string, string>) => ({ text: `${parseInt(originalValue)}%` });


  getDataSource() {
    this.devExpressService.getData().subscribe({
      next: (res) => {
        this.productsData = [];
        for (const obj of res.products) {
          this.productsData.push(obj);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
