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
    return this.formInfo.repeatable
      && !this.formInfo.disabled
      && Object.keys(this.fis.sortedForms[this.formId]).length > 1
  }
  get formInfo() {
    return this.fis.forms[this.formId]
  }
}
