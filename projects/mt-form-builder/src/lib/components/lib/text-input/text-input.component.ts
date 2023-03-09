import { ChangeDetectorRef, Component } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { FormInfoService } from '../../../services/form-info.service';
/**
 * @note name property is required so chrome will not guess input as password and show unwanted recommandation
 */
@Component({
  selector: 'lib-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css', '../form.css']
})
export class TextInputComponent extends NgLinker {
  constructor(public cdRef: ChangeDetectorRef,
    public formInfoSvc: FormInfoService

  ) {
    super(cdRef,formInfoSvc);
  }
  handleChange(event:InputEvent){
    this.base.ctrl.setValue((event.target as any).value)
  }
}

