import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { IOption } from '../../../classes/template.interface';
import { FormInfoService } from '../../../services/form-info.service';
@Component({
  selector: 'lib-virtual-scroll-select',
  templateUrl: './virtual-scroll-select.component.html',
  styleUrls: ['./virtual-scroll-select.component.css', '../form.css']
})
export class VirtualScrollSelectComponent extends NgLinker implements OnInit, OnChanges, OnDestroy {
  constructor(
    cdRef: ChangeDetectorRef,
    public formInfoSvc: FormInfoService
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
  selected: IOption;
  saveSelected(option: IOption) {
    this.selected = option;
  }
  scrollTop(e: boolean, scroll: CdkVirtualScrollViewport) {
    if (e)
      scroll.scrollToOffset(1)
  }
}
