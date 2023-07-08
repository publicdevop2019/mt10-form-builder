import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';
import { ISelectControl } from '../../../classes/template.interface';
import { CommonComponent } from '../../../classes/common.component';
import { IOption } from '../../../classes/template.interface';
import { FormInfoService } from '../../../services/form-info.service';
@Component({
  selector: 'lib-virtual-scroll-select',
  templateUrl: './virtual-scroll-select.component.html',
  styleUrls: ['./virtual-scroll-select.component.css', '../form.css']
})
export class VirtualScrollSelectComponent extends CommonComponent implements OnInit{
  constructor(
    public fis: FormInfoService
  ) {
    super(fis);
  }
  ngOnInit(): void {
    this.bindError()
  }
  selected: IOption;
  saveSelected(option: IOption) {
    this.selected = option;
  }
  scrollTop(e: boolean, scroll: CdkVirtualScrollViewport) {
    if (e)
      scroll.scrollToOffset(1)
  }
  get config(): ISelectControl {
    return super.config as ISelectControl
  }
}
