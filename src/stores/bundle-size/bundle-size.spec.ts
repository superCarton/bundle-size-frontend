import { bundleSizeReducer, initialState, getBundleId } from './bundle-size.reducers';
import { GetBundleSizeFromApiAction, GetBundleSizeAction, GetBundleSizeFailAction } from './bundle-size.actions';
import { BundleSizes } from '../../sdk';
import { BundleSizeState } from './bundle-size.state';
import { Subject } from 'rxjs';
import {Action} from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import { BundleSizeEffect } from './bundle-size.effect';

describe('Bundle size store', () => {

  describe('Reducers', () => {

    it('should not be pending nor error initially', () => {
      expect(initialState.isPending).toBeFalsy();
      expect(initialState.isFailure).toBeFalsy();
    });

    it('should not have errors or warningsinitially', () => {
      expect(initialState.errors).toBeUndefined();
      expect(initialState.warnings).toBeUndefined();
    });

    it('should set the status to pending when performing a call', () => {
      const fakePromise = new Promise((resolve) => resolve());
      expect(bundleSizeReducer(initialState, new GetBundleSizeFromApiAction(fakePromise)).isPending).toBeTruthy();
    });

    it('should reset the errors/warnings/isFailure when performing a call', () => {
      const fakePromise = new Promise((resolve) => resolve());
      const state: BundleSizeState = {...initialState, isFailure: true, errors: [{title: 'Err'}], warnings: ['Warn']};
      expect(bundleSizeReducer(state, new GetBundleSizeFromApiAction(fakePromise)).isFailure).toBeFalsy();
      expect(bundleSizeReducer(state, new GetBundleSizeFromApiAction(fakePromise)).errors).toBeUndefined();
      expect(bundleSizeReducer(state, new GetBundleSizeFromApiAction(fakePromise)).warnings).toBeUndefined();
    });

    it('should add the reponse to the entities in case of success', () => {
      const data: BundleSizes[] = [{packageName: 'angular', version: '8.2.1', gzip: 100, size: 1000}];
      expect(bundleSizeReducer(initialState, new GetBundleSizeAction(data)).ids).
        toEqual([getBundleId(data[0].packageName, data[0].version)]);
    });

    it('should set is pending to false in case of success', () => {
      const data: BundleSizes[] = [{packageName: 'angular', version: '8.2.1', gzip: 100, size: 1000}];
      expect(bundleSizeReducer({...initialState, isPending: true}, new GetBundleSizeAction(data)).isPending).toBeFalsy();
    });

    it('should add warnings in case of success', () => {
      const data: BundleSizes[] = [{packageName: 'angular', version: '8.2.1', gzip: 100, size: 1000}];
      const warnings: string[] = ['This is missing'];
      expect(bundleSizeReducer(initialState, new GetBundleSizeAction(data, warnings)).warnings).toBeDefined();
      expect(bundleSizeReducer(initialState, new GetBundleSizeAction(data, warnings)).warnings[0]).toEqual(warnings[0]);
    });

    it('should set is failure to true in case of failure', () => {
      const errors: string[] = ['This is an error'];
      expect(bundleSizeReducer(initialState, new GetBundleSizeFailAction(errors)).isFailure).toBeTruthy();
    });

    it('should set errors in case of failure', () => {
      const errors: string[] = ['This is an error'];
      expect(bundleSizeReducer(initialState, new GetBundleSizeFailAction(errors)).errors).toBeDefined();
      expect(bundleSizeReducer(initialState, new GetBundleSizeFailAction(errors)).errors[0]).toEqual({title: errors[0]});
    });
  });

  describe('Effect', () => {
    let actions: Subject<Action>;
    let bundleSizeEffect: BundleSizeEffect;
    let result: Action[];

    beforeEach(() => {
      actions = new Subject<Action>();
      result = [];

      TestBed.configureTestingModule({providers: [provideMockActions(() => actions), BundleSizeEffect]});
      bundleSizeEffect = TestBed.get(BundleSizeEffect);
    });

    it('should dispatch GetBundleSizeFromApiAction in case of success response', (done) => {

      const data: BundleSizes[] = [{packageName: 'angular', version: '8.2.1', gzip: 100, size: 1000}];
      const successRes = {data};
      const fakePromise = new Promise((resolve) => resolve(successRes));

      bundleSizeEffect.bundleSizeEffect$.subscribe((x) => result.push(x), done, () => {
        expect(result).toEqual([new GetBundleSizeAction(data)]);
        done();
      });

      actions.next(new GetBundleSizeFromApiAction(fakePromise));
      actions.complete();
    });

    it('should dispatch GetBundleSizeFailAction in case of failure response', (done) => {

      const err: string[] = ['This is an error'];
      const failureRes = {errors: err};
      const fakePromise = new Promise((resolve) => resolve(failureRes));

      bundleSizeEffect.bundleSizeEffect$.subscribe((x) => result.push(x), done, () => {
        expect(result).toEqual([new GetBundleSizeFailAction(err)]);
        done();
      });

      actions.next(new GetBundleSizeFromApiAction(fakePromise));
      actions.complete();
    });
  });

});
