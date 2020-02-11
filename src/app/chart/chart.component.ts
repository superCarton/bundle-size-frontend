import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BundleSizes } from '../../sdk';

export interface DataSerie {
  /**
   * Package name with version
   */
  name: string;
  /**
   * Size and gzip size
   */
  series: {
    name: 'gzip' | 'size',
    value: number
  }[];
}

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {

  @Input()
  public bundleSizes: BundleSizes[];

  /**
   * Formatted data
   */
  public data: DataSerie[];

  /**
   * Converts the bundle size into and object that can be displayed by chart
   * @param bundleSize
   */
  public formatBundleSizeToChartSerie(bundleSize: BundleSizes): DataSerie {
    return {
      name: `${bundleSize.packageName}@${bundleSize.version}`,
      series: [{
        name: 'size',
        value: bundleSize.size
      }, {
        name: 'gzip',
        value: bundleSize.gzip
      }]
    };
  }

  /**
   * @inheritdoc
   */
  public ngOnChanges(changes: SimpleChanges) {
    if (changes && this.bundleSizes) {
      this.data = this.bundleSizes.map(this.formatBundleSizeToChartSerie);
      console.log(this.data);
    }
  }
}
