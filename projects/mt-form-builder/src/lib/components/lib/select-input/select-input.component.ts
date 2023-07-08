import { Component, OnInit } from '@angular/core';
import { ISelectControl } from '../../../classes/template.interface';
import { CommonComponent } from '../../../classes/common.component';
import { FormInfoService } from '../../../services/form-info.service';
@Component({
  selector: 'lib-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css', '../form.css']
})
export class SelectInputComponent extends CommonComponent implements OnInit{
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
