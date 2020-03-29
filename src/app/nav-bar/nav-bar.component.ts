import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CreatorSvc } from '../service/creator.service';
export interface INavElement {
  link: string;
  display: string;
  state: string
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  mobileQuery: MediaQueryList;
  fillerNav: INavElement[] = [
    {
      link: 'dashboard',
      display: 'Dashboard',
      state: 'none'
    }
    ,
    {
      link: 'form-gui',
      display: 'Create New Form (GUI)',
      state: 'create'
    }
    ,
    {
      link: 'form-json',
      display: 'Create New Form (JSON)',
      state: 'create'
    }
    ,
    {
      link: 'view-gui',
      display: 'Change Form Layout (GUI)',
      state: 'update'
    }
  ];
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }
  toGitHub(){
    window.open('todo','_blank')
  }
}
