import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MG_CONST } from '../constants';
import { EditorService } from '../services/editor.service';
import { Base } from './base';
export class Editor {
    private _opePanel = 'operation-console';
    public selectFrame = false;
    public isMarkedAsSingle = false;
    public isMarkedAsGroup = false;
    public consoleSub: Subscription;
    public confirmSub: Subscription;
    public draggable = false;
    constructor(
        public editorServ: EditorService, public base: Base
    ) {
        this.confirmSub = this.editorServ.confirmMark$.subscribe(key => {
            this._comfirmHandler(key);
        });
        this.consoleSub = this.editorServ.systemFG.valueChanges.subscribe(change => {
            this._consoleHandler();
        });
    }
    onClick(btn) {
        if (this.editorServ.systemFG) {
            if (
                this._hasValues(this.editorServ.systemFG.get(this._opePanel), 'util_clear')) {
                this._removeFromSelection();
            } else if (this._hasValues(this.editorServ.systemFG.get(this._opePanel), 'select_single', 'select_group', 'util_delete')) {
                // NOTE:prevent lable click event fire twice
                btn.preventDefault();
                btn.stopPropagation();
                this._clickNotify();
            } else {
                // do nothing
            }
        } else {
            // do nothing
        }
    }
    onmouseleave() {
        // toggleSelectFrame
        if (this.editorServ.systemFG &&
            this._hasValues(this.editorServ.systemFG.get(this._opePanel), 'select_single', 'select_group', 'util_delete')) {
            this.selectFrame = !this.selectFrame;
            this._updateClass();
        } else {
            // do nothing
        }
    }
    ondragstart(btn) {
        setTimeout(() => {
            // hide after drag finished
            // this.display=false; to prevent dragover element itself
            // this.base.display = false;
            this.editorServ.notifyDraging(this.base.ctrlKey);
        });
    }
    ondragover(e) {
        e.preventDefault(); // enable drop
    }
    ondrop(btn) {
        this.editorServ.notifyDrop(this.base.config.key,
            this.base.config.position);
    }

    private _clickNotify() {
        if (this._hasValues(this.editorServ.systemFG.get(this._opePanel), 'select_single')) {
            this.editorServ.requestMarking(this.base.config.key, true);
        } else if (this._hasValues(this.editorServ.systemFG.get(this._opePanel), 'select_group')) {
            this.editorServ.requestMarking(this.base.config.key, false);
        } else if (this._hasValues(this.editorServ.systemFG.get(this._opePanel), 'util_delete')) {
            this.editorServ.requestDelete(this.base.config.key);
        } else {
            console.error('should never reach else block::hightlightFrame');
        }
    }
    /**
     *@description merge css class to one fn to simply logic
     *
     */
    private _updateClass(): void {
        // this.base.appClass = this.selectFrame ?
        //     this.base.uniqueConcat(this.base.appClass, ' Frame_Style_Hover') : this.base.appClass.replace(' Frame_Style_Hover', '');
        // this.base.appClass = this.isMarkedAsSingle ?
        //     this.base.uniqueConcat(this.base.appClass, ' Frame_Style_Highlight_Single') :
        //     this.base.appClass.replace(' Frame_Style_Highlight_Single', '');
        // this.base.appClass = this.isMarkedAsGroup ?
        //     this.base.uniqueConcat(this.base.appClass, ' Frame_Style_Highlight_Group') :
        //     this.base.appClass.replace(' Frame_Style_Highlight_Group', '');
        // this.base.appClass = this.draggable ?
        //     this.base.uniqueConcat(this.base.appClass, ' Temp_Shake') : this.base.appClass.replace(' Temp_Shake', '');
        // this.base.previousAppClass = this.base.appClass;
    }
    /**
   * @event
   * request highlight when click,need confirm response from manager
   *
   */
    private _comfirmHandler(ctrlName: string) {
        if (ctrlName === this.base.config.key) {
            if (this._hasValues(this.editorServ.systemFG.get(this._opePanel), 'select_single')) {
                this.isMarkedAsSingle = true;
                this.isMarkedAsGroup = !this.isMarkedAsSingle;
            } else if (this._hasValues(this.editorServ.systemFG.get(this._opePanel), 'select_group')) {
                this.isMarkedAsGroup = true;
                this.isMarkedAsSingle = !this.isMarkedAsGroup;
            } else {
                console.error('should never reach else block::comfirmHandler');
            }
        } else {
            // do nothing
        }
        this._updateClass();
    }
    private _removeFromSelection() {
        // console.debug("removeFromSelection")
        this.editorServ.notifyUnselect(this.base.config.key);
        this.isMarkedAsSingle = false;
        this.isMarkedAsGroup = false;
        this._updateClass();
    }
    /**
     *@description used in HTML only
     *
     */
    private _consoleHandler() {
        this.draggable = this._hasValues(this.editorServ.systemFG.get(this._opePanel), 'update_layout');
        this._updateClass();
    }
    public editorNgOnDestroy() {
        try {
            this.base.onDestroy();
            this.consoleSub.unsubscribe();
            this.confirmSub.unsubscribe();
        } catch (error) {
        }
    }
    private _hasValues(ctrl: AbstractControl, ...values: string[]): boolean {
        return values.indexOf(ctrl.value) > -1;
    }
}
