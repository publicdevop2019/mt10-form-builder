import { ChangeDetectorRef, Component } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { BaseService } from '../../../services/base.service';
import { EditorService } from '../../../services/editor.service';

@Component({
  selector: 'lib-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css', '../form.css']
})
export class FileUploadComponent extends NgLinker {
  constructor(editorServ: EditorService, baseServ: BaseService, public cdRef: ChangeDetectorRef) {
    super(editorServ, baseServ, cdRef);
  }
  updateCtrl(files: FileList) {
    this.fg.get(this.base.ctrlKey).setValue(files);
  }
}
