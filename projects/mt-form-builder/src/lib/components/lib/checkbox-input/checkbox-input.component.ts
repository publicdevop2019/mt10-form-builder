import { Component } from '@angular/core';
import { ICheckboxControl } from '../../../classes/template.interface';
import { CommonComponent } from '../../../classes/common.component';
import { FormInfoService } from '../../../services/form-info.service';
/**
 * checkbox input
 * return array of values when multiple inputs
 * return boolean value when single input
 */
@Component({
  selector: 'lib-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.css', '../form.css']
})
export class CheckboxInputComponent extends CommonComponent {
  constructor(public fis: FormInfoService) {
    super(fis);
  }
  get config(): ICheckboxControl {
    return super.config as ICheckboxControl
  }
}
