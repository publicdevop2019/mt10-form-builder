import {
    AfterViewChecked, ChangeDetectorRef, HostBinding,
    HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseService } from '../services/base.service';
import { EditorService } from '../services/editor.service';
import { Base } from './base';
import { Editor } from './editor';
import { IInputConfig } from './template.interface';
/** @description link class properties to ng component */
export abstract class NgLinker implements OnDestroy, OnChanges, AfterViewChecked, OnInit {
    editor: Editor;
    base: Base;
    /** start of base binding */
    @Input() fg: FormGroup;
    @Input() config: IInputConfig;
    @HostBinding('class') get appClass() { return this.base.appClass; } // bootstrap4 work around
    @HostBinding('id') id: string;
    /** end of base binding */
    /** start of editor binding */
    @HostBinding('draggable') get draggable() {
        if (this.editor !== undefined) {
            return this.editor.draggable;
        } else {
            return false;
        }
    }
    @HostListener('click', ['$event']) onClickLink(btn) {
        if (this.editor !== undefined) {
            this.editor.onClick(btn);
        }
    }
    @HostListener('mouseenter', ['$event.target'])
    @HostListener('mouseleave', ['$event.target']) onMouseLeaveLink(btn) {
        if (this.editor !== undefined) {
            this.editor.onmouseleave();
        }
    }
    @HostListener('dragstart', ['$event.target']) onDragStartLink(btn) {
        if (this.editor !== undefined) {
            this.editor.ondragstart(btn);
        }
    }
    @HostListener('dragover', ['$event']) onDragOverLink(e) {
        if (this.editor !== undefined) {
            this.editor.ondragover(e);
        }
    }
    @HostListener('drop', ['$event.target']) onDropLink(btn) {
        if (this.editor !== undefined) {
            this.editor.ondrop(btn);
        }
    }
    /** end of editor binding */
    constructor(public editorServ: EditorService, public baseServ: BaseService, public cdRef: ChangeDetectorRef) {
        this.base = new Base(baseServ, cdRef);
        this.fg = this.base.fg;
        this.config = this.base.config;
    }
    ngOnDestroy(): void {
        this.base.onDestroy();
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.base.onChanges(changes);
        this.editor = new Editor(this.editorServ, this.base);
    }
    ngAfterViewChecked(): void {
        this.base.afterViewChecked();
    }
    ngOnInit(): void {
        this.base.onInit();
    }
}
