import { AfterViewChecked, ChangeDetectorRef, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormInfoService } from '../services/form-info.service';
import { Base } from './base';
import { IInputConfig, IOption, ISetValueEvent } from './template.interface';
/** @description link class properties to ng component */
@Directive()
export abstract class NgLinker implements OnDestroy, OnChanges, AfterViewChecked, OnInit {
    base: Base;
    /** start of base binding */
    @Input() fg: FormGroup;
    @Input() config: IInputConfig;
    @Input() formId: string;
    // bootstrap4 work around,return '' if input is not displayed, see DYNAMIC_FORM_CONDITIONAL for more details
    @HostBinding('class') get appClass() { return this.config.display ? this.base.appClass : ''; }
    /** end of base binding */
    /** start of editor binding */
    /** end of editor binding */
    private changeSub: Subscription;
    constructor(
        public cdRef: ChangeDetectorRef, public fis: FormInfoService) {
        this.base = new Base(cdRef);
        this.fg = this.base.fg;
        this.config = this.base.config;
    }
    ngOnDestroy(): void {
        this.base.onDestroy();
        this.changeSub && this.changeSub.unsubscribe();
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.base.onChanges(changes);
    }
    ngAfterViewChecked(): void {
        this.base.afterViewChecked();
    }
    ngOnInit(): void {
        this.base.onInit();
    }
    filterDuplicate() {
        if (this.config.options && this.config.options.length > 0)
            return this.config.options.filter((e, i) => this.config.options.findIndex(ee => ee.value === e.value) === i)
    }
    handleClick(el:IOption){
        if(this.config.multiple){
            if(!this.base.ctrl.value){
              this.base.ctrl.setValue([el.value])
            }else{
              if(!Array.isArray(this.base.ctrl.value)){
                this.base.ctrl.setValue([],{emitEvent:false})
              }
              if(this.base.ctrl.value.includes(el.value)){
                this.base.ctrl.setValue(this.base.ctrl.value.filter(e=>e!==el.value))
              }else{
                this.base.ctrl.setValue([...this.base.ctrl.value,el.value])
              }
            }
        }else{
            this.base.ctrl.setValue(el.value)
        }
      }
      
}
