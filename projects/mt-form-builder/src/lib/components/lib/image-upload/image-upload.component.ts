import { Component } from '@angular/core';
import { CommonComponent } from '../../../classes/common.component';
import { IUploadFileEvent } from '../../../classes/template.interface';
import { FormInfoService } from '../../../services/form-info.service';

@Component({
  selector: 'lib-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css', '../form.css']
})
export class ImageUploadComponent extends CommonComponent {
  constructor(public fis: FormInfoService) {
    super(fis);
  }
  updateCtrl(files: FileList) {
    this.fis.$uploadFile.next(<IUploadFileEvent>{ formId: this.formId, key: this.key, files: files })
  }
  isString(str: string | FileList) {
    if (str === '')
      return false
    if (typeof str === 'string')
      return true
    return false
  }
}
