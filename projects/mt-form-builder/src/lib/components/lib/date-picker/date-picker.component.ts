import { ChangeDetectorRef, Component } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { FormInfoService } from '../../../services/form-info.service';

@Component({
  selector: 'lib-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent extends NgLinker {
  constructor(public cdRef: ChangeDetectorRef,
    public formInfoSvc: FormInfoService

  ) {
    super(cdRef);
  }
  hasRequired() {
    return this.config.attributes && this.config.attributes.some(e => e.type === 'required')
  }
}
