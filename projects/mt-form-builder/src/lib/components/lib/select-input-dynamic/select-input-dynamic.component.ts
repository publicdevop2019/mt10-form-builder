import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { BaseService } from '../../../services/base.service';
import { EditorService } from '../../../services/editor.service';
export interface IDropdown {
  value: string;
}
@Component({
  selector: 'lib-select-input-dynamic',
  templateUrl: './select-input-dynamic.component.html',
  styleUrls: ['./select-input-dynamic.component.css','../form.css']
})
export class SelectInputDynamicComponent extends NgLinker implements OnInit, OnChanges, OnDestroy {
  constructor(
    editorServ: EditorService, baseServ: BaseService,
    cdRef: ChangeDetectorRef
  ) {
    super(editorServ, baseServ, cdRef);
  }
  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }
  ngOnInit() {
    super.ngOnInit();
  }
}
