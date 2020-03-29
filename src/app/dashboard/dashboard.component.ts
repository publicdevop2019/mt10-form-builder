import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IMGList } from '../interfaze/commom.interface';
import { HttpProxyService } from '../service/http-proxy.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'gui','json'];
  dataSource: MatTableDataSource<IMGList>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private _httpProxy: HttpProxyService, private router: Router) {
    /**
     * look up key chain
     */
    this._httpProxy.netImpl.getKeyChain().subscribe(next => {
      /**
       * key chain exist
       */
      this._httpProxy.netImpl.keychain = next;
      this._httpProxy.netImpl.getUserForms().subscribe(next => {
        this._httpProxy.netImpl.keychainPayload = next.blob as IMGList[];
        this._httpProxy.netImpl.keychainLastUpdateAt = next.lastUpdateAt;
        this.dataSource = new MatTableDataSource(next.blob as IMGList[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      
    }, error => {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        /**
         * key chain not found, create new one instead
         */
        this._httpProxy.netImpl.createKeyChain().subscribe(next => {
          this._httpProxy.netImpl.keychain = next;
          this.router.navigateByUrl('/workshop/form?state=create')
        });
      } else {
        /**
         * unknown error
         */
        throwError(error);
      }
    });

  }

  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
