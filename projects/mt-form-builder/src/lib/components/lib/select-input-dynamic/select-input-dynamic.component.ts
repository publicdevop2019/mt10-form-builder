import { Component, OnInit } from '@angular/core';
import { ISelectControl } from '../../../classes/template.interface';
import { CommonComponent } from '../../../classes/common.component';
import { FormInfoService } from '../../../services/form-info.service';
@Component({
  selector: 'lib-select-input-dynamic',
  templateUrl: './select-input-dynamic.component.html',
  styleUrls: ['./select-input-dynamic.component.css', '../form.css']
})
export class SelectInputDynamicComponent extends CommonComponent implements OnInit{
  get config(): ISelectControl {
    return super.config as ISelectControl
  }
  constructor(
    public fis: FormInfoService
  ) {
    super(fis);
  }
  ngOnInit(): void {
    this.bindError()
  }
}
