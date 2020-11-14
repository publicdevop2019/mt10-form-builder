import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DASH_BOARD } from '../workshop-json/workshop-json.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'json'];
  dataSource: MatTableDataSource<any>=new MatTableDataSource(DASH_BOARD);;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor() {
  }
  ngOnInit() {
  }
}
