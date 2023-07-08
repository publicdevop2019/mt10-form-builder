import { Component } from '@angular/core';
import { IRadioControl } from '../../../classes/template.interface';
import { CommonComponent } from '../../../classes/common.component';
import { FormInfoService } from '../../../services/form-info.service';
@Component({
  selector: 'lib-radio-input',
  templateUrl: './radio-input.component.html',
  styleUrls: ['./radio-input.component.css', '../form.css']
})
export class RadioInputComponent extends CommonComponent{
  constructor(public fis:FormInfoService) {
    super(fis);
  }
  get config(): IRadioControl {
    return super.config as IRadioControl
  }
}
