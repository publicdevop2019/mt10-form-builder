import { ChangeDetectorRef, Component } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { FormInfoService } from '../../../services/form-info.service';
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
}

