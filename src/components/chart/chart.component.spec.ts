import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { Component } from '@angular/core';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  @Component({
    selector: 'ngx-charts-bar-vertical-2d',
    template: '',
    inputs: ['results', 'gradient', 'xAxis', 'yAxis', 'legend', 'showXAxisLabel', 'showYAxisLabel', 'yAxisLabel', 'legendTitle']
  })
  class MockChart2dComponent {}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent, MockChart2dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
  });

  it('should format correctly the data', () => {
    fixture.detectChanges();
    const bSize = [{packageName: 'test', version: '1.0.0', gzip: 10, size: 100}];
    component.bundleSizes = bSize;
    component.ngOnChanges({bundleSizes: {currentValue: bSize, firstChange: true, previousValue: undefined, isFirstChange: () => true}});
    expect(component.data).toBeDefined();
    expect(component.data).toEqual([{
      name: 'test@1.0.0',
      series: [{
        name: 'size',
        value: 100
      }, {
        name: 'gzip',
        value: 10
      }]
    }]);
  });
});
