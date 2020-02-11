import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BundleSizes, BundleSizeReply } from 'src/sdk';
import { BundleSizesStore, selectBundleSizeStorePendingStatus, Err, selectCurrentBundleSizes, selectBundleSizeStoreErrors, selectBundleSizeStoreWarnings, GetBundleSizeFromApiAction } from 'src/stores';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { processCall } from 'src/helpers';

@Component({
  selector: 'package-search-panel',
  templateUrl: './package-search-panel.component.html',
  styleUrls: ['./package-search-panel.component.scss']
})
export class PackageSearchPanelComponent {

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
