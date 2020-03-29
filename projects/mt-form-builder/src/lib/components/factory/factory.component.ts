import { AfterViewInit, ChangeDetectorRef, Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class FactoryComponent implements OnChanges, AfterViewInit, OnInit {
  ngOnInit(): void {
    this.fis.formGroupCollection_template[this.formId] = JSON.parse(JSON.stringify(this.formInfo)) as IForm;
    this.fis.formGroupCollection_index[this.formId] = 0;
  }
  ngAfterViewInit(): void {
    this.rowLength = this._rowLength();
    this.cdr.detectChanges();
  }
  public fg: FormGroup;
  private rowLength: number;
  @Input() formInfo: IForm;
  @Input() formId: string;
  constructor(public fis: FormInfoService, private _cs: ConverterService, private cdr: ChangeDetectorRef) {
  }
  @HostBinding('class') appClass: string = MG_CONST.CONTAINER_FLUID;
  ngOnChanges(changes?: SimpleChanges) {
    this.fg = this._cs.getFormGroup(this.formId, this.formInfo.inputs);
    this.fis.formGroupCollection_formInfo[this.formId] = this.formInfo;
    /** @description first load check */
    this.fis.refreshLayout(this.formInfo, this.formId);
  }
  removeConfigs(groupIndex: string) {
    let removeRows: string[] = this.fis.totalRowGroupedRowCollectionIndex[this.formId][groupIndex];
    this.formInfo.inputs = this.formInfo.inputs.filter(e => removeRows.indexOf(e.position.row) === -1);
    this.ngOnChanges()
  }
  private _rowLength(): number {
    let maxY = 0;
    this.fis.formGroupCollection_template[this.formId].inputs.forEach(config => {
      if (+config.position.row > maxY) {
        maxY = +config.position.row;
      }
    });
    return maxY + 1;
  }
  public add() {
    this.fis.add(this.formId);
    this.ngOnChanges()
  }
}
