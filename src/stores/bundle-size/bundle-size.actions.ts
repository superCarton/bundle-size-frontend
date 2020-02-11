import { Action } from '@ngrx/store';
import { BundleSizeReply, BundleSizes } from '../../sdk';

export const ACTION_GET_BUNDLE_SIZE_FROM_API = '[Bundle Size] get bundle size from API';
export const ACTION_GET_BUNDLE_SIZE = '[Bundle Size] get bundle size';
export const ACTION_FAIL_BUNDLE_SIZE = '[Bundle Size] fail bundle size';

export class GetBundleSizeFromApiAction implements Action {
  public readonly type = ACTION_GET_BUNDLE_SIZE_FROM_API;
  constructor(public call: Promise<BundleSizeReply>) {}
}

export class GetBundleSizeAction implements Action {
  public readonly type = ACTION_GET_BUNDLE_SIZE;
  constructor(public data: BundleSizes[], public warnings?: string[]) {}
}

export class GetBundleSizeFailAction implements Action {
  public readonly type = ACTION_FAIL_BUNDLE_SIZE;
  constructor(public errors: string[]) {}
}
