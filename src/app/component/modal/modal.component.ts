import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseService, FormInfoService } from 'magic-form';
import { CONST } from '../../constant/constant';
import { CreatorSvc } from '../../service/creator.service';
import { InitSvc } from '../../service/init.service';
import { IForm, IInputConfig } from 'magic-form/lib/classes/template.interface';
export interface DialogData {
    animal: string;
    name: string;
}
@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'modal.component.html',
})
export class ModalComponent {
    private _connectionKey: string;
    public baseForm: IForm;
    public dynamicForm: IForm;
    public activeConsoleBtnName: string;
    // centralize ui mapping, this confi modal on initial load.
    public uiLayout = {
        textWizard: {
            confirmBtn: true,
        },
        radioWizard: {
            confirmBtn: true,
        },
        checkboxWizard: {
            confirmBtn: true,
        },
        sigWizard: {
            confirmBtn: true,
        },
        formatedWizard: {
            confirmBtn: true,
        },
        staticDisplayWizard: {
            confirmBtn: true,
        },
        selectWizard: {
            confirmBtn: true,
        },
        add_attribute: {
            addAttributeBtn: true,
        },
        add_connection: {
            conConfirmBtn: false,
            dynamicInputCreator: false,
            connectionDashboard: true,
        }
    };
    constructor(
        private _p: InitSvc,
        public creator: CreatorSvc,
        private _fis: FormInfoService,
        private _bs: BaseService,
        public dialogRef: MatDialogRef<ModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        this.baseForm = this._p.baseForm;
        this.dynamicForm = this._p.dynamicForm;
        this.activeConsoleBtnName = this.creator.systemFG.get(CONST.LEFT_PANEL_ID).value
            || this.creator.systemFG.get(CONST.RIGHT_PANEL_ID).value;
    }
    public displayDynamicF(activeMemName?: string) {
        return ['radioWizard', 'checkboxWizard', 'selectWizard']
            .indexOf(activeMemName) > -1 || this.uiLayout.add_connection.dynamicInputCreator;
    }
    addConnection(key: string) {
        if (key.indexOf('specific') > -1) {
            this._connectionKey = key;
            this.uiLayout.add_connection.dynamicInputCreator = true;
            this.uiLayout.add_connection.connectionDashboard = false;
            this.uiLayout.add_connection.conConfirmBtn = true;
        } else {
            this.creator.connectionMgr.addConnection(key);
            this.discardModal();
        }
    }
    updateConnection() {
        this.creator.connectionMgr
            .generate(Object.keys(this._fis.formGroupCollection['dynamicF'].controls)
                .filter(el => el.indexOf('key_option') > -1).map(ctrl => this._fis.formGroupCollection['dynamicF'].get(ctrl).value));
        this.creator.connectionMgr.addConnection(this._connectionKey);
        this.uiLayout.add_connection.dynamicInputCreator = false;
        this.uiLayout.add_connection.connectionDashboard = true;
        this.uiLayout.add_connection.conConfirmBtn = false;
        this.discardModal();
    }
    check(key: IInputConfig) {
        try {
            return this.uiLayout[this.activeConsoleBtnName][key.key];
        } catch (error) {
            return false;
        }
    }
    checkBtn(btnId: string) {
        try {
            return this.uiLayout[this.activeConsoleBtnName][btnId];
        } catch (error) {
            return false;
        }
    }
    discardModal() {
        this.creator.systemFG.reset();
        this.creator.updateView();
        this.dialogRef.close();
    }
    ngOnDestroy(): void {
        this._fis.formGroupCollection['modal'].reset();
        if (this._fis.formGroupCollection['dynamicF'])
            this._fis.formGroupCollection['dynamicF'].reset();
        // reset replaySub as well
        this._bs.reset();
    }
    public createTempJSON() {
        this.creator.create(this.creator.tempWorker.getTemp(this._fis.formGroupCollection['modal'],
            this._fis.formGroupCollection['dynamicF'], this.activeConsoleBtnName, this.creator.getNextRowSlot()));
        this.discardModal();
    }
    public addAttributes() {
        if (this._fis.formGroupCollection['modal'].get('workshop_AddAttributes').value) {
            this.creator.selectedFields.forEach(ctrl => {
                if (this._fis.formGroupCollection['modal'].get('workshop_Attribute_Extra').value) {
                    this.creator.tempWorker.attributeMapper(this._fis.formGroupCollection['modal'].get('workshop_AddAttributes').value,
                        ctrl, this._fis.formGroupCollection['modal'].get('workshop_Attribute_Extra').value);
                } else {
                    this.creator.tempWorker.attributeMapper(this._fis.formGroupCollection['modal'].get('workshop_AddAttributes').value, ctrl);
                }
            });
        } else {
            // do nothing
        }
        this.discardModal();
    }

}