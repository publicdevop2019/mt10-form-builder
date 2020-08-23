import { ChangeDetectorRef, Component } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { FormInfoService } from '../../../services/form-info.service';

@Component({
  selector: 'lib-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css', '../form.css']
})
export class FileUploadComponent extends NgLinker {
  constructor(public cdRef: ChangeDetectorRef,public formInfoSvc:FormInfoService) {
    super(cdRef);
  }
  updateCtrl(files: FileList) {
    this.fg.get(this.base.ctrlKey).setValue(files);
  }
}
