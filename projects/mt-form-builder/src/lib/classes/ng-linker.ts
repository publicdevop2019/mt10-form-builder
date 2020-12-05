import { AfterViewChecked, ChangeDetectorRef, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, Directive } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormInfoService } from '../services/form-info.service';
import { Base } from './base';
import { IInputConfig, ISetValueEvent } from './template.interface';
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
        this.changeSub = this.base.ctrl.valueChanges.subscribe(_ => {
            if (this.fis.eventEmit) {
                let event = <ISetValueEvent>{ type: 'setvalue', id: new Date().getTime(), formId: this.formId, key: this.base.ctrlKey, value: _, createAt: new Date().getTime() };
                this.fis.$eventPub.next(event)
            }
        })
    }
}
