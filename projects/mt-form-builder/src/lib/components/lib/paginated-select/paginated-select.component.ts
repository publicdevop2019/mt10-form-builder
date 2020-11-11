import { ChangeDetectorRef, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { FormInfoService } from '../../../services/form-info.service';

@Component({
  selector: 'lib-paginated-select',
  templateUrl: './paginated-select.component.html',
  styleUrls: ['./paginated-select.component.css', '../form.css']
})
export class PaginatedSelectComponent extends NgLinker implements OnInit, OnChanges, OnDestroy {
  private _visibilityConfig = {
    threshold: 0
  };
  loading: boolean = false;
  ref: ElementRef;
  @ViewChild('ghostRef') set ghostRef(ghostRef: ElementRef) {
    if (ghostRef) { // initially setter gets called with undefined
      this.ref = ghostRef;
      this.observer.observe(this.ref.nativeElement);
    }
  }
  private  observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loading = true;
        this.cdRef.detectChanges();
        this.formInfoSvc.$loadNextPage.next({ formId: this.formId, ctrlKey: this.base.ctrlKey });
      }
    });
  }, this._visibilityConfig);
  constructor(
    cdRef: ChangeDetectorRef,
    public formInfoSvc: FormInfoService
  ) {
    super(cdRef,formInfoSvc);
    this.formInfoSvc.$loadNextPageComplete.subscribe(e => {
      if (e.formId === this.formId && e.ctrlKey === this.base.ctrlKey) {
        this.loading = false;
      }
    })
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
  loadComplete(){
    return this.formInfoSvc.completeLoading.some(e=>this.base.ctrlKey.includes(e.ctrlKey))
  }
}
