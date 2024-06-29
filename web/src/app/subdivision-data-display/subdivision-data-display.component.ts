import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../services/api.service";
import { BehaviorSubject, Subject, takeUntil, combineLatest, map } from "rxjs";
import { Subdivision, SubdivisionStatusCode } from "../models/subdivision.model";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css']
})
export class SubdivisionDataDisplayComponent implements OnInit, AfterViewInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject();

  statusFilter$ = new BehaviorSubject<[SubdivisionStatusCode, boolean][]>([
    [SubdivisionStatusCode.Active, false],
    [SubdivisionStatusCode.Future, false],
    [SubdivisionStatusCode.BuiltOut, false],
  ]);

  displayedColumns: string[] = ['name', 'code', 'status', 'date'];
  dataSource = new MatTableDataSource<Subdivision>([]);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  ngOnInit(): void {
    combineLatest(this.api.getSubdivisions(), this.statusFilter$).pipe(
      map(([{subdivisions}, status]) => {
        const selectedStatuses = status
          .filter(([, checked]) => checked)
          .map(([name]) => name);
        return selectedStatuses.length === 0 ? subdivisions :
          subdivisions.filter(({subdivisionStatusCode}) => {
            return selectedStatuses.includes(subdivisionStatusCode);
          })
      }),
      takeUntil(this.unsubscribe$),
    ).subscribe((subdivisions) => {
      this.dataSource.data = subdivisions;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'date': return new Date(item.nearMapImageDate);
        default: // @ts-ignore
          return item[property];
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
