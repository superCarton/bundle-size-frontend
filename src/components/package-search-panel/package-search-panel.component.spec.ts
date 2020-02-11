import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { Component, Directive } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { initialState } from '../../stores';
import { PackageSearchPanelComponent } from './package-search-panel.component';

describe('PackageSearchPanelComponent', () => {

  @Component({
    selector: 'chart',
    template: '',
    inputs: ['bundleSizes']
  })
  class MockChartComponent {}

  @Directive({
    selector: '[packageNameValidator]'
  })
  class MockValidatorDirective {}

  const mockStore: BehaviorSubject<any> = new BehaviorSubject({bundleSize: initialState});
  (mockStore as any).dispatch = jasmine.createSpy('dispatch');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PackageSearchPanelComponent,
        MockChartComponent,
        MockValidatorDirective
      ],
      imports: [
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      providers: [{provide: Store, useValue: mockStore}]
    }).compileComponents();
  }));

  it('should not show the spinner by default', () => {
    const fixture = TestBed.createComponent(PackageSearchPanelComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.spinner')).toBeNull();
  });

  it('should not show the chart by default', () => {
    const fixture = TestBed.createComponent(PackageSearchPanelComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('chart')).toBeNull();
  });

  it('should dispatch a search to the backend when submitting the form', () => {
    const fixture = TestBed.createComponent(PackageSearchPanelComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    component.onSubmit();
    expect((mockStore as any).dispatch).toHaveBeenCalled();
  });
});
