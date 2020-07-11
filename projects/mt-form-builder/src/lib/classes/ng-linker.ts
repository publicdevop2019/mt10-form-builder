import { AfterViewChecked, ChangeDetectorRef, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Base } from './base';
import { IInputConfig } from './template.interface';
/** @description link class properties to ng component */
export abstract class NgLinker implements OnDestroy, OnChanges, AfterViewChecked, OnInit {
    base: Base;
    /** start of base binding */
    @Input() fg: FormGroup;
    @Input() config: IInputConfig;
    // bootstrap4 work around,return '' if input is not displayed, see DYNAMIC_FORM_CONDITIONAL for more details
    @HostBinding('class') get appClass() { return this.config.display ? this.base.appClass : ''; }
    /** end of base binding */
    /** start of editor binding */
    /** end of editor binding */
    constructor( 
         public cdRef: ChangeDetectorRef) {
        this.base = new Base(cdRef);
        this.fg = this.base.fg;
        this.config = this.base.config;
    }
    ngOnDestroy(): void {
        this.base.onDestroy();
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
}
