import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IForm } from '../../classes/template.interface';
import { MG_CONST } from '../../constants';
import { ConverterService } from '../../services/converter.service';
import { FormInfoService } from '../../services/form-info.service';
@Component({
  selector: 'lib-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})
export class FactoryComponent implements OnChanges, AfterViewInit, OnDestroy {
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  public fg: FormGroup;
  @Input() formInfo: IForm;
  @Input() formId: string;
  constructor(public fis: FormInfoService, private _cs: ConverterService, private cdr: ChangeDetectorRef) {
  }
  ngOnDestroy(): void {
    delete this.fis.formGroupCollection[this.formId];
    delete this.fis.formGroupCollection_formInfo[this.formId];
    delete this.fis.formGroupCollection_index[this.formId];
    delete this.fis.formGroupCollection_template[this.formId];
    delete this.fis.totalRowCollection[this.formId];
    delete this.fis.groupedRowCollection[this.formId];
    delete this.fis.totalRowGroupedRowCollection[this.formId];
    delete this.fis.totalRowGroupedRowCollectionIndex[this.formId];
  }
  @HostBinding('class') appClass: string = MG_CONST.CONTAINER_FLUID;
  ngOnChanges(changes?: SimpleChanges) {
    if (!this.fis.formGroupCollection_template[this.formId])
      this.fis.formGroupCollection_template[this.formId] = JSON.parse(JSON.stringify(this.formInfo)) as IForm;
    if (this.fis.formGroupCollection_index[this.formId] === null || this.fis.formGroupCollection_index[this.formId] === undefined)
      this.fis.formGroupCollection_index[this.formId] = 0;
    this.fis.formGroupCollection_formInfo[this.formId] = this.formInfo;
    this.fg = this._cs.getFormGroup(this.formId, this.formInfo.inputs);
    /** @description first load check */
    this.fis.refreshLayout(this.formInfo, this.formId);
  }
  removeConfigs(groupIndex: string) {
    let removeRows: string[] = this.fis.totalRowGroupedRowCollectionIndex[this.formId][groupIndex];
    this.formInfo.inputs = this.formInfo.inputs.filter(e => removeRows.indexOf(e.position.row) === -1);
    this.ngOnChanges()
  }
  public add() {
    this.fis.add(this.formId);
    this.ngOnChanges()
  }
}
