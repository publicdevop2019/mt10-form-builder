import { Component } from '@angular/core';
import { CommonComponent } from '../../../classes/common.component';
import { FormInfoService } from '../../../services/form-info.service';

@Component({
  selector: 'lib-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css', '../form.css']
})
export class DatePickerComponent extends CommonComponent {
  constructor(
    public fis: FormInfoService
  ) {
    super(fis);
  }
}
