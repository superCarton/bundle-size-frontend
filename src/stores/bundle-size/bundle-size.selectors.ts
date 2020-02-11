import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BundleSizeState, BUNDLE_SIZE_STORE_NAME } from './bundle-size.state';
import { adapter } from './bundle-size.reducers';

const {selectAll, selectEntities} = adapter.getSelectors();

export const selectBundleSizeState = createFeatureSelector<BundleSizeState>(BUNDLE_SIZE_STORE_NAME);
export const selectBundleSizeStorePendingStatus = createSelector(selectBundleSizeState, (state) => state.isPending);
export const selectBundleSizeStoreErrors = createSelector(selectBundleSizeState, (state) => state.errors);
export const selectBundleSizeStoreWarnings = createSelector(selectBundleSizeState, (state) => state.warnings);
export const selectCurrentBundleSizes = createSelector(selectBundleSizeState, selectAll);
export const selectBundleSizeEntities = createSelector(selectBundleSizeState, selectEntities);
