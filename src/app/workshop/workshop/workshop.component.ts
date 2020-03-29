import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BaseService } from 'magic-form';
import { merge, Observable, Subscription } from 'rxjs';
import { ModalComponent as ModalComponent } from '../../component/modal/modal.component';
import { CONST } from '../../constant/constant';
import { CreatorSvc } from '../../service/creator.service';
import { ActivatedRoute } from '@angular/router';
import { HttpProxyService } from '../../service/http-proxy.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { IForm, IEvent } from 'magic-form/lib/classes/template.interface';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.css']
})
export class WorkshopComponent implements OnInit, OnDestroy {
  public consoleSub: Subscription;
  public toolColumn: number = 2;
  public toolRatio: string = '4:1';
  public modalWidth: string = '50%';
  public modalmaxHeight: string = '50%';
  constructor(
    public creator: CreatorSvc,
    private _bsvc: BaseService,
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private httpProxy: HttpProxyService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.creator.updateView();
    if (this.router.snapshot.paramMap.get('id')) {
      this.httpProxy.netImpl.getFormDetails(this.router.snapshot.paramMap.get('id')).subscribe(next => {
        this.creator.currentFormLastUpdateAt = next.lastUpdateAt;
        this.creator.temps = next.blob as IForm;
        this.creator.updateView();
      })
    } else {
      /**
       * start from scrach
       */
    }
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(next => {
      if(next.breakpoints[Breakpoints.XSmall]){
        console.dir('xsmall')
        this.toolColumn = 1;
        this.toolRatio = '4:1';
        this.modalWidth = '90vw';
        this.modalmaxHeight = '90vh';
      }
      else if(next.breakpoints[Breakpoints.Small]){
        console.dir('small')
        this.toolColumn = 1;
        this.toolRatio = '10:1';
        this.modalWidth = '90vw';
        this.modalmaxHeight = '90vh';
        
      }
      else if(next.breakpoints[Breakpoints.Medium]){
        console.dir('medium')
        this.toolColumn = 2;
        this.toolRatio = '4:1';
        
      }
      else if(next.breakpoints[Breakpoints.Large]){
        console.dir('large')
        this.toolColumn = 2;
        this.toolRatio = '4:1';
        
      }
      else if(next.breakpoints[Breakpoints.XLarge]){
        console.dir('xlarge')
        this.toolColumn = 2;
        this.toolRatio = '20:1';
        
      }
      else{
        console.error('unknown device width match!')
        console.dir(next)
      }
    });

  }
  ngOnInit() {
    // sub after console is initialized
    this.consoleSub = merge(this.creator.systemFG.get(CONST.LEFT_PANEL_ID).valueChanges,
      this.creator.systemFG.get(CONST.RIGHT_PANEL_ID).valueChanges).subscribe(e => {
        this._display(e) ? this.openDialog() : null;
      });
  }
  private _display(activeMemName?: string) {
    if (['add_connection', 'add_attribute'].indexOf(activeMemName) > -1) {
      this._bsvc.nextProxy(<IEvent>{ 'hide': ['workshop_InputName'] });
    }
    if (['add_attribute'].indexOf(activeMemName) > -1) {
      this._bsvc.nextProxy(<IEvent>{ 'show': ['workshop_AddAttributes'] });
    }
    if (['formatedWizard'].indexOf(activeMemName) > -1) {
      this._bsvc.nextProxy(<IEvent>{ 'show': ['workshop_Format'] });
    }
    return ['textWizard', 'radioWizard', 'checkboxWizard', 'sigWizard', 'formatedWizard',
      'staticDisplayWizard', 'selectWizard', 'add_connection', 'add_attribute'].indexOf(activeMemName) > -1;
  }

  ngOnDestroy(): void {
  }
  canDeactivate(): Observable<boolean> {
    return new Observable<boolean>(observe => {
      if (this.creator.isEmpty()) {
        observe.next(true);
      } else {
        observe.next(true);
      }
    });
  }
  openDialog(): void {
    this.dialog.open(ModalComponent, {
      width: this.modalWidth,
      maxHeight: this.modalmaxHeight,
      // height:this.modalmaxHeight,
      autoFocus: true
    });
  }
}
