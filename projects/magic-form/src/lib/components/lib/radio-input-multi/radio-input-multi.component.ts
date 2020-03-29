import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { BaseService } from '../../../services/base.service';
import { EditorService } from '../../../services/editor.service';
@Component({
  selector: 'lib-radio-input-multi',
  templateUrl: './radio-input-multi.component.html',
  styleUrls: ['./radio-input-multi.component.css', '../form.css']
})
export class RadioInputMultiComponent extends NgLinker implements OnDestroy, OnInit {
  constructor(editorServ: EditorService, baseServ: BaseService, public cdRef: ChangeDetectorRef) {
    super(editorServ, baseServ, cdRef);
  }
  ngOnInit() {
    super.ngOnInit();
    this.removeUnMappedValue();
  }
  removeUnMappedValue() {
    if (this.config.options.indexOf(this.fg.get(this.config.key).value) == -1)
      this.fg.get(this.config.key).setValue('')
  }
}
