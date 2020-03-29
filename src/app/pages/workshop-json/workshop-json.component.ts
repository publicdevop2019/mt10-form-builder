import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormInfoService } from 'magic-form';
import { IForm, IInputConfig } from 'magic-form/lib/classes/template.interface';
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { CreatorSvc } from '../../service/creator.service';
import { HttpProxyService } from '../../service/http-proxy.service';

@Component({
  selector: 'app-workshop-json',
  templateUrl: './workshop-json.component.html',
  styleUrls: ['./workshop-json.component.css']
})
export class WorkshopJsonComponent implements OnInit {
  get raw() {
    return JSON.stringify(this.creator.viewTemps, null, 2)
  }
  @ViewChild('editor', { static: true }) editor: any;
  public formId: string = 'workshop';
  private previousPayload: any;
  constructor(
    public creator: CreatorSvc,
    public dialog: MatDialog,
    private router: ActivatedRoute,
    private httpProxy: HttpProxyService,
    private chagneRef: ChangeDetectorRef,
    private fis: FormInfoService,
  ) {
    this.creator.updateView();
    if (this.router.snapshot.paramMap.get('id')) {
      this.httpProxy.netImpl.getFormDetails(this.router.snapshot.paramMap.get('id')).subscribe(next => {
        this.formId = this.formId + this.router.snapshot.paramMap.get('id');
        this.creator.currentFormLastUpdateAt = next.lastUpdateAt;
        this.creator.temps = next.blob as IForm;
        this.creator.updateView();
      })
    } else {
      /**
       * start from scrach
       */
    }

  }

  ngOnInit() {
    this.chagneRef.detectChanges();
    fromEvent<KeyboardEvent>(this.editor.nativeElement, 'keyup').pipe(filter(e => ![37, 38, 39, 40].includes(e.keyCode))).pipe(debounceTime(1000)).subscribe(() => {
      try {
        this.creator.viewTemps = JSON.parse((this.editor.nativeElement as HTMLTextAreaElement).value);
      } catch (e) {
        console.error(e)
      }
    });
    this.previousPayload = this.fis.formGroupCollection[this.formId].value;
    this.fis.formGroupCollection[this.formId].valueChanges.subscribe(e => {
      const changedKey = this.findDelta(e);
      this.creator.viewTemps.inputs.filter(input => input.key === changedKey).forEach(input => this.fis.validateInput(this.formId, input));
      // this.creator.viewTemps.inputs.forEach(input => this.fis.validateInput(this.formId, input));
      this.previousPayload = this.fis.formGroupCollection[this.formId].value;
    });
  }

  findDelta(newPayload: any): string {
    const changeKeys: string[] = [];
    for (const p in newPayload) {
      if (this.previousPayload[p] === newPayload[p]) {
      } else {
        changeKeys.push(p as string);
      }
    }
    return changeKeys[0];
  }

}
