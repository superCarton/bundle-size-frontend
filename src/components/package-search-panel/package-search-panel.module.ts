import { NgModule } from '@angular/core';
import { MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BundleSizeStoreModule } from '../../stores';
import { ChartModule } from '../chart';
import { PackageNameValidatorDirective } from '../../directives';
import { PackageSearchPanelComponent } from './package-search-panel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PackageSearchPanelComponent, PackageNameValidatorDirective, PackageSearchPanelComponent],
  exports: [PackageSearchPanelComponent],
  imports: [
    CommonModule,
    BundleSizeStoreModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ChartModule
  ],
  providers: [],
})
export class PackageSearchPanelModule { }
