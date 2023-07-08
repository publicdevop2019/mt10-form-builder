import { Component, Input } from '@angular/core';
import { FormInfoService } from '../../services/form-info.service';
@Component({
  selector: 'lib-factory',
  templateUrl: './factory.component.html',
})
export class FactoryComponent {
  @Input() formId: string;
  constructor(public fis: FormInfoService) {
  }
  displayDeleteBtn() {
    return this.fis.forms[this.formId].repeatable
      && !this.fis.forms[this.formId].disabled
      && this.fis.forms[this.formId].inputs.length > 1
  }
}
