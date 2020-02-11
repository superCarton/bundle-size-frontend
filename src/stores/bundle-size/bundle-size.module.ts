import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { bundleSizeReducer } from './bundle-size.reducers';
import { BUNDLE_SIZE_STORE_NAME } from './bundle-size.state';
import { BundleSizeEffect } from './bundle-size.effect';

@NgModule({
  imports: [
    StoreModule.forFeature(BUNDLE_SIZE_STORE_NAME, bundleSizeReducer),
    EffectsModule.forFeature([BundleSizeEffect])
  ]
})
export class BundleSizeStoreModule {}
