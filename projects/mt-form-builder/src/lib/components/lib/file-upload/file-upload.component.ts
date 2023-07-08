import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonComponent } from '../../../classes/common.component';
import { FormInfoService } from '../../../services/form-info.service';

@Component({
  selector: 'lib-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css', '../form.css']
})
export class FileUploadComponent extends CommonComponent {
  constructor(public cdRef: ChangeDetectorRef,public fis:FormInfoService) {
    super(fis);
  }
  updateCtrl(files: FileList) {
    this.control.setValue(files)
  }
}
