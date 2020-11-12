import { ChangeDetectorRef, Component } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { IUploadFileEvent } from '../../../classes/template.interface';
import { FormInfoService } from '../../../services/form-info.service';

@Component({
  selector: 'lib-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css', '../form.css']
})
export class ImageUploadComponent extends NgLinker {
  constructor(public cdRef: ChangeDetectorRef, public formInfoSvc: FormInfoService) {
    super(cdRef, formInfoSvc);
  }
  updateCtrl(files: FileList) {
    this.formInfoSvc.$uploadFile.next(<IUploadFileEvent>{ key: this.base.ctrlKey, files: files })
  }
  isString(str: string | FileList) {
    if (str === '')
      return false
    if (typeof str === 'string')
      return true
    return false
  }
}
