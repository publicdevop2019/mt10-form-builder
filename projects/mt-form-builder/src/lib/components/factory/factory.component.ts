import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IForm } from '../../classes/template.interface';
import { MG_CONST } from '../../constants';
import { FormInfoService } from '../../services/form-info.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'lib-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})
/**
 * @description 
 * @note do not clean form related value in destory lifecycle, in dynamic form, 
 *       fis will get update & remove with random order 
 */
export class FactoryComponent implements OnChanges, AfterViewInit, OnDestroy {
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  public fg: FormGroup;
  @Input() formInfo: IForm;
  @Input() formId: string;
  private sub: Subscription
  constructor(public fis: FormInfoService, private cdr: ChangeDetectorRef) {

    this.sub = this.fis.$refresh.subscribe(() => {
      this.fis.update(this.formId);
      this.cdr.markForCheck();
    })
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
  @HostBinding('class') appClass: string = MG_CONST.CONTAINER_FLUID;
  ngOnChanges(changes?: SimpleChanges) {
    if (!this.fis.formGroupCollection_template[this.formId])
      this.fis.formGroupCollection_template[this.formId] = JSON.parse(JSON.stringify(this.formInfo)) as IForm;
    if (this.fis.formGroupCollection_index[this.formId] === null || this.fis.formGroupCollection_index[this.formId] === undefined)
      this.fis.formGroupCollection_index[this.formId] = 0;
    if (!this.fis.formGroupCollection_formInfo[this.formId])
      this.fis.formGroupCollection_formInfo[this.formId] = this.formInfo;
    this.fg = this.fis.update(this.formId)
  }
  removeConfigs(groupIndex: string) {
    let removeRows: string[] = this.fis.totalRowGroupedRowCollectionIndex[this.formId][groupIndex];
    let var0: string[] = []
    removeRows.forEach(e => {
      var0.push(...this.fis.layoutCollection[this.formId][e].map(el => el.key))
    })
    this.formInfo.inputs = this.formInfo.inputs.filter(e => var0.indexOf(e.key) === -1);
    this.fis.update(this.formId)
  }
  public add() {
    this.fis.add(this.formId);
  }
}
