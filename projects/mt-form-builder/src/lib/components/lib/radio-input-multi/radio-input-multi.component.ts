import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { FormInfoService } from '../../../services/form-info.service';
@Component({
  selector: 'lib-radio-input-multi',
  templateUrl: './radio-input-multi.component.html',
  styleUrls: ['./radio-input-multi.component.css', '../form.css']
})
export class RadioInputMultiComponent extends NgLinker implements OnDestroy, OnInit {
  constructor(public cdRef: ChangeDetectorRef,public formInfoSvc:FormInfoService) {
    super(cdRef);
  }
  ngOnInit() {
    super.ngOnInit();
  }
}
