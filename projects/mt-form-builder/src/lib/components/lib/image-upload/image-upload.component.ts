import { ChangeDetectorRef, Component } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { FormInfoService } from '../../../services/form-info.service';

@Component({
  selector: 'lib-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css', '../form.css']
})
export class ImageUploadComponent extends NgLinker {
  constructor(public cdRef: ChangeDetectorRef, public formInfoSvc: FormInfoService) {
    super(cdRef);
  }
  updateCtrl(files: FileList) {
    this.fg.get(this.base.ctrlKey).setValue(files);
  }
  isString(str: string | FileList) {
    if (str === '')
      return false
    if (typeof str === 'string')
      return true
    return false
  }
}
