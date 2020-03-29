import { ChangeDetectorRef, Component } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { BaseService } from '../../../services/base.service';
import { EditorService } from '../../../services/editor.service';
@Component({
  selector: 'lib-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css','../form.css']
})
export class TextInputComponent extends NgLinker {
  constructor(editorServ: EditorService, baseServ: BaseService, public cdRef: ChangeDetectorRef
  ) {
    super(editorServ, baseServ, cdRef);
  }
}

