import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  BundleSizesStore,
  GetBundleSizeFromApiAction,
  selectBundleSizeStorePendingStatus,
  selectCurrentBundleSizes,
  selectBundleSizeStoreErrors,
  Err,
  selectBundleSizeStoreWarnings
} from '../stores';
import { Observable } from 'rxjs';
import { processCall } from '../helpers';
import { map } from 'rxjs/operators';
import { BundleSizes, BundleSizeReply } from '../sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public packageToSearch: string | null = null;
  public isPending$: Observable<boolean>;
  public bundleSizes$: Observable<BundleSizes[]>;
  public errors$: Observable<Err[] | undefined>;
  public warnings$: Observable<string[] | undefined>;

  constructor(private store: Store<BundleSizesStore>) {
    this.isPending$ = this.store.pipe(select(selectBundleSizeStorePendingStatus));
    this.bundleSizes$ = this.store.pipe(
      select(selectCurrentBundleSizes),
      map((bundleSizes) => bundleSizes.filter((bSize) => bSize.packageName === this.packageToSearch))
    );
    this.errors$ = this.store.pipe(select(selectBundleSizeStoreErrors));
    this.warnings$ = this.store.pipe(select(selectBundleSizeStoreWarnings));
  }

  public onSubmit() {
    this.store.dispatch(
      new GetBundleSizeFromApiAction(processCall<BundleSizeReply>('http://localhost:8080/package-sizes?package=' + this.packageToSearch)));
  }
}
