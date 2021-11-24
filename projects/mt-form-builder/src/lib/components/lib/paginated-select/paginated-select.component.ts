import { ChangeDetectorRef, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgLinker } from '../../../classes/ng-linker';
import { IOption } from '../../../classes/template.interface';
import { FormInfoService } from '../../../services/form-info.service';

@Component({
  selector: 'lib-paginated-select',
  templateUrl: './paginated-select.component.html',
  styleUrls: ['./paginated-select.component.css', '../form.css']
})
export class PaginatedSelectComponent extends NgLinker implements OnInit, OnChanges, OnDestroy {
  updateOption(options: IOption[]) {
    const duplicateObj = options.filter((e, i) => options.findIndex(ee => ee.value === e.value) !== i);
    const duplicateKey = Array.from(new Set(duplicateObj.map(e => e.value)));
    const withoutDuplicate = options.filter(e => !duplicateKey.includes(e.value));
    const onlyDuplicate = options.filter(e => duplicateKey.includes(e.value));
    const var0 = [];
    duplicateKey.forEach(key => {
      const same = onlyDuplicate.filter(e => e.value === key);
      let select: IOption = undefined;
      same.forEach(e => {
        if (!select) {
          select = e;
        } else {
          if (e.label.length > select.label.length) {
            select = e;
          }
        }
      })
      var0.push(select)
    })
    const next = [...var0, ...withoutDuplicate]
    this.config.options = next;
  }
  private _visibilityConfig = {
    threshold: 0
  };
  loading: boolean = false;
  allLoaded: boolean = false;
  ref: ElementRef;
  private pageNumber = 0;
  private pageSize = 10;
  @ViewChild('ghostRef') set ghostRef(ghostRef: ElementRef) {
    if (ghostRef) { // initially setter gets called with undefined
      this.ref = ghostRef;
      this.observer.observe(this.ref.nativeElement);
    }
  }
  private observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loading = true;
        let lookupKey = this.config.key;
        if (this.config.key.includes('_')) {
          //remove expaneded index for dynamic form input
          lookupKey = this.config.key.split('_')[0]
        }
        this.fis.queryProvider[this.formId + '_' + lookupKey].readByQuery(this.pageNumber, this.pageSize, this.config.queryPrefix, undefined, undefined, { 'loading': false }).subscribe(next => {
          this.loading = false;
          if (next.data.length === 0) {
            this.allLoaded = true;
          } else {
            this.config.optionOriginal = [...(this.config.optionOriginal || []), ...next.data]
            this.config.options = [...this.config.options, ...next.data.map(e => <IOption>{ label: e.description && this.config.description ? (e.name + " - " + e.description) : e.name, value: e.id })];
            this.updateOption(this.config.options)
            if (next.data.length < this.pageSize) {
              this.allLoaded = true;
            } else {
              this.pageNumber++;
            }
          }
          this.cdRef.markForCheck();
        })
      }
    });
  }, this._visibilityConfig);
  constructor(
    cdRef: ChangeDetectorRef,
    public formInfoSvc: FormInfoService
  ) {
    super(cdRef, formInfoSvc);
  }
  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
  }
  ngOnDestroy() {
    this.ref && this.observer.observe(this.ref.nativeElement);
    super.ngOnDestroy();
  }
  ngOnInit() {
    super.ngOnInit();
  }
}
