import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../services/api.service";
import { BehaviorSubject, Subject, takeUntil, combineLatest, map } from "rxjs";
import { Subdivision, SubdivisionStatusCode } from "../models/subdivision.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";

enum SortDirection {
  NameAsc = 0,
  NameDesc = 1,
  DateAsc = 2 ,
  DateDesc = 3,
  None = 4,
}

@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css']
})
export class SubdivisionDataDisplayComponent implements OnInit, AfterViewInit, OnDestroy {

  SortDirection = SortDirection;

  private sortComparatorMap = {
    [SortDirection.NameAsc]: (a: Subdivision, b: Subdivision) => a.name.localeCompare(b.name),
    [SortDirection.NameDesc]: (a: Subdivision, b: Subdivision) => b.name.localeCompare(a.name),
    [SortDirection.DateAsc]: (a: Subdivision, b: Subdivision) => (new Date(a.nearMapImageDate).getTime() - new Date(b.nearMapImageDate).getTime()),
    [SortDirection.DateDesc]: (a: Subdivision, b: Subdivision) => (new Date(b.nearMapImageDate).getTime() - new Date(a.nearMapImageDate).getTime()),
    [SortDirection.None]: () => 0,
  }

  private unsubscribe$: Subject<void> = new Subject();

  sortDirection$ = new BehaviorSubject<SortDirection>(SortDirection.None);

  statusFilter$ = new BehaviorSubject<[SubdivisionStatusCode, boolean][]>([
    [SubdivisionStatusCode.Active, false],
    [SubdivisionStatusCode.Future, false],
    [SubdivisionStatusCode.BuiltOut, false],
  ]);

  displayedColumns: string[] = ['name', 'code', 'status', 'date'];
  dataSource = new MatTableDataSource<Subdivision>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private api: ApiService) {
  }

  updateStatusFilter(statusCode: SubdivisionStatusCode, checked: boolean) {
    const newStatusFilter = this.statusFilter$.getValue().map((val) => {
      if (val[0] === statusCode) {
        return [val[0], checked] as [SubdivisionStatusCode, boolean];
      }
      return val;
    });
    this.statusFilter$.next(newStatusFilter);
  }

  onClickName() {
    const sort = this.sortDirection$.getValue();
    if (sort === SortDirection.NameAsc) {
      this.sortDirection$.next(SortDirection.NameDesc);
    } else if (sort === SortDirection.NameDesc) {
      this.sortDirection$.next(SortDirection.None);
    } else {
      this.sortDirection$.next(SortDirection.NameAsc);
    }
  }

  onClickDate() {
    const sort = this.sortDirection$.getValue();
    if (sort === SortDirection.DateAsc) {
      this.sortDirection$.next(SortDirection.DateDesc);
    } else if (sort === SortDirection.DateDesc) {
      this.sortDirection$.next(SortDirection.None);
    } else {
      this.sortDirection$.next(SortDirection.DateAsc);
    }
  }

  private filterByStatus(subdivisions: Subdivision[], status: [SubdivisionStatusCode, boolean][]): Subdivision[] {
    const selectedStatuses = status
      .filter(([, checked]) => checked)
      .map(([name]) => name);
    return selectedStatuses.length === 0 ? subdivisions :
      subdivisions.filter(({subdivisionStatusCode}) => {
        return selectedStatuses.includes(subdivisionStatusCode);
      })
  }

  private sort(subdivisions: Subdivision[], sortDirection: SortDirection) {
    return [...subdivisions].sort(this.sortComparatorMap[sortDirection]);
  }

  ngOnInit(): void {
    combineLatest(this.api.getSubdivisions(), this.statusFilter$, this.sortDirection$).pipe(
      map(([{subdivisions}, status, sortDirection]) => {
        const filtered = this.filterByStatus(subdivisions, status);
        return this.sort(filtered, sortDirection);
      }),
      takeUntil(this.unsubscribe$),
    ).subscribe((subdivisions) => {
      this.dataSource.data = subdivisions;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
