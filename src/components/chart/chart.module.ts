import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartComponent } from './chart.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ChartComponent],
  exports: [ChartComponent],
  imports: [
    CommonModule,
    NgxChartsModule
  ]
})
export class ChartModule { }
