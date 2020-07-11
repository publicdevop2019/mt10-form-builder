import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
export interface IDropdown {
  value: string;
}
@Component({
  selector: 'lib-select-input-dynamic',
  templateUrl: './select-input-dynamic.component.html',
  styleUrls: ['./select-input-dynamic.component.css', '../form.css']
})
export class SelectInputDynamicComponent extends NgLinker implements OnInit, OnChanges, OnDestroy {
  constructor(
    cdRef: ChangeDetectorRef
  ) {
    super(cdRef);
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
