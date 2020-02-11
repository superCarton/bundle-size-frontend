import { EntityState } from '@ngrx/entity';
import { BundleSizes } from '../../sdk';

export const BUNDLE_SIZE_STORE_NAME = 'bundleSize';

export interface Err {
  title: string;
  stack?: string;
}

export interface BundleSizeState extends EntityState<BundleSizes> {
  isPending: boolean;
  isFailure: boolean;
  errors?: Err[];
  warnings?: string[];
}

export interface BundleSizesStore {
  [BUNDLE_SIZE_STORE_NAME]: BundleSizeState;
}
