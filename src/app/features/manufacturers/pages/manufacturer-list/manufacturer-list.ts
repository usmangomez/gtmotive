import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ManufacturersActions } from '../../store/manufacturers.actions';
import {
  selectManufacturers,
  selectManufacturersCurrentPage,
  selectManufacturersHasMore,
  selectManufacturersLoading
} from '../../store/manufacturers.selectors';
import { AsyncPipe } from '@angular/common';
import { ManufacturerCards } from '../../components/manufacturer-cards/manufacturer-cards';
import { Input } from '../../../../shared/components/input/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, startWith, switchMap, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manufacturer-list',
  imports: [
    AsyncPipe,
    ManufacturerCards,
    Input,
    ReactiveFormsModule,
  ],
  templateUrl: './manufacturer-list.html',
  styleUrl: './manufacturer-list.scss',
})
export class ManufacturerList implements OnInit, OnDestroy {
  @ViewChild('scrollAnchor', { static: true }) scrollAnchor!: ElementRef<HTMLDivElement>;

  private readonly store = inject(Store);
  private readonly router = inject(Router);

  private observer!: IntersectionObserver;

  public readonly form = new FormGroup({ search: new FormControl('') });

  public readonly manufacturers$ = this.store.select(selectManufacturers).pipe(
    switchMap((manufacturers) =>
      this.form.controls.search.valueChanges.pipe(
        startWith(''),
        map((search) =>
          search
            ? manufacturers.filter((m) =>
                m.Mfr_CommonName?.toLowerCase()?.includes(search?.toLowerCase() || ''),
              )
            : manufacturers,
        ),
      ),
    ),
  );

  public readonly loading$ = this.store.select(selectManufacturersLoading);
  public readonly currentPage$ = this.store.select(selectManufacturersCurrentPage);
  public readonly hasMore$ = this.store.select(selectManufacturersHasMore);

  ngOnInit() {
    this.store
      .select(selectManufacturers)
      .pipe(take(1))
      .subscribe((manufacturers) => {
        if (manufacturers.length === 0) {
          this.store.dispatch(ManufacturersActions.loadManufacturers({ page: 1 }));
        }
      });
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.loadNextPage();
        }
      },
      { threshold: 0 },
    );

    this.observer.observe(this.scrollAnchor.nativeElement);
  }

  private loadNextPage() {
    combineLatest([this.loading$, this.hasMore$, this.currentPage$])
      .pipe(take(1))
      .subscribe(([loading, hasMore, page]) => {
        if (!loading && !this.form.controls.search.value && hasMore) {
          this.store.dispatch(ManufacturersActions.loadManufacturers({ page: page + 1 }));
        }
      });
  }

  handleClickCard(manufacturerId: number) {
    this.router.navigate(['/manufacturers', manufacturerId]).then();
  }
}
