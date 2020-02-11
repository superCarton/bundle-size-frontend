import { Action } from '@ngrx/store';
import { BundleSizeState } from './bundle-size.state';
import { createEntityAdapter } from '@ngrx/entity';
import {
  ACTION_GET_BUNDLE_SIZE_FROM_API,
  ACTION_GET_BUNDLE_SIZE,
  ACTION_FAIL_BUNDLE_SIZE,
  GetBundleSizeFailAction,
  GetBundleSizeAction
} from './bundle-size.actions';
import { BundleSizes } from '../../sdk';

export function getBundleId(packageName: string, packageVersion: string) {
  return `${packageName}@${packageVersion}`;
}

export const adapter = createEntityAdapter<BundleSizes>({
  selectId: (model) => getBundleId(model.packageName, model.version)
});

export const initialState: BundleSizeState = adapter.getInitialState({isPending: false, isFailure: false});

export function bundleSizeReducer(state: BundleSizeState = initialState, action: Action): BundleSizeState {
  switch (action.type) {
    case ACTION_GET_BUNDLE_SIZE_FROM_API:
      return { ...state, isPending: true, isFailure: false, errors: undefined, warnings: undefined };
    case ACTION_GET_BUNDLE_SIZE:
      return adapter.addMany((action as GetBundleSizeAction).data,
        {...state, warnings: (action as GetBundleSizeAction).warnings, isPending: false});
    case ACTION_FAIL_BUNDLE_SIZE: {
      const errs = (action as GetBundleSizeFailAction).errors.map((err) => ({title: `${err}`}));
      return {...state, isPending: false, errors: errs, isFailure: true};
    }
    default:
      return state;
  }
}
