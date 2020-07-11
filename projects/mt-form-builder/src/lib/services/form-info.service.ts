import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { IForm, IInputConfig } from '../classes/template.interface';
import { Observable, Subject } from 'rxjs';
/**
 * @description this service is exported to outside projects, each form will have it's own layout info
 *
 */
@Injectable({
    providedIn: 'root'
})
export class FormInfoService {
    public formGroupCollection: { [formId: string]: FormGroup } = {};
    public formGroupCollection_formInfo: { [formId: string]: IForm } = {};
    public formGroupCollection_index: { [formId: string]: number } = {};
    public formGroupCollection_template: { [formId: string]: IForm } = {};

    public totalRowCollection: { [formId: string]: string[] } = {};

    public groupedRowCollection: { [formId: string]: { [groupNumber: number]: { [rowNum: string]: IInputConfig[] } } } = {};
    public totalRowGroupedRowCollection: { [formId: string]: string[] } = {};
    public totalRowGroupedRowCollectionIndex: { [formId: string]: { [groupNumber: number]: string[] } } = {};

    public layoutCollection: { [formId: string]: { [rowNum: string]: IInputConfig[] } } = {};
    public $ready: Subject<string> = new Subject();
    public $refresh: Subject<void> = new Subject()
    /** based on coordinate slice rows */
    public refreshLayout(formInfo: IForm, formId: string): void {
        const layout: { [key: string]: IInputConfig[] } = {};
        formInfo.inputs.forEach(e => {
            if (e.position) {
                layout[e.position.row] ?
                    layout[e.position.row].push(e) :
                    layout[e.position.row] = [e];
                layout[e.position.row].sort((a, b) => {
                    return (+a.position.column) - (+b.position.column);
                });
            } else {
                throw new Error('missing position in config :: ' + e.key);
            }
        });
        this.layoutCollection[formId] = layout;
        this.totalRowCollection[formId] = Object.keys(layout);
        let groupLength = this.groupLength(formId);
        let groupNumber = 0;
        this.totalRowGroupedRowCollectionIndex[formId] = {};
        this.groupedRowCollection[formId] = {};
        Object.keys(layout).forEach(rowIdex => {
            if (!this.groupedRowCollection[formId][groupNumber])
                this.groupedRowCollection[formId][groupNumber] = {};
            this.groupedRowCollection[formId][groupNumber][rowIdex] = this.layoutCollection[formId][String(rowIdex)];
            if (!this.totalRowGroupedRowCollectionIndex[formId])
                this.totalRowGroupedRowCollectionIndex[formId] = {};
            if (!this.totalRowGroupedRowCollectionIndex[formId][groupNumber])
                this.totalRowGroupedRowCollectionIndex[formId][groupNumber] = []
            this.totalRowGroupedRowCollectionIndex[formId][groupNumber].push(rowIdex);
            if ((+rowIdex + 1) % groupLength === 0) {
                groupNumber++;
            }
        });
        this.totalRowGroupedRowCollection[formId] = Object.keys(this.groupedRowCollection[formId]);
    }
    private groupLength(formId: string): number {
        let maxY = 0;
        this.formGroupCollection_template[formId].inputs.forEach(config => {
            if (+config.position.row > maxY) {
                maxY = +config.position.row;
            }
        });
        return maxY + 1;
    }
    /**
     * @description provide basic validataion
     */
    validateInput(formId: string, input: IInputConfig) {
        let errors: string[] = [];
        input.attributes && input.attributes.forEach(attr => {
            if (attr.type == 'required') {
                if (Array.isArray(this.formGroupCollection[formId].get(input.key).value) && this.formGroupCollection[formId].get(input.key).value.length > 0) {
                    errors = errors.filter(e => e !== attr.errorMsg);
                } else if (typeof this.formGroupCollection[formId].get(input.key).value === 'string' && this.formGroupCollection[formId].get(input.key).value) {
                    errors = errors.filter(e => e !== attr.errorMsg);
                } else if (typeof this.formGroupCollection[formId].get(input.key).value === 'boolean') {
                    errors = errors.filter(e => e !== attr.errorMsg);
                } else if (typeof this.formGroupCollection[formId].get(input.key).value === 'number') {
                    errors = errors.filter(e => e !== attr.errorMsg);
                }
                else {
                    errors.push(attr.errorMsg);
                }
            }
            if (attr.type == 'numberOnly') {
                const regEx: RegExp = /^\d*$/;
                if (!this.formGroupCollection[formId].get(input.key).value) {
                    errors = errors.filter(e => e !== attr.errorMsg);
                } else {
                    const b = regEx.test(this.formGroupCollection[formId].get(input.key).value);
                    if (b) {
                        errors = errors.filter(e => e !== attr.errorMsg);
                    } else {
                        errors.push(attr.errorMsg);
                    }
                }
            }
            if (attr.type.indexOf('min') > -1) {
                let num = +attr.type.replace('min', '')
                let regex = new RegExp(`^.{${num},}$`);
                const b = regex.test(this.formGroupCollection[formId].get(input.key).value);
                if (b) {
                    errors = errors.filter(e => e !== attr.errorMsg);
                } else {
                    errors.push(attr.errorMsg);
                }
            }
            if (attr.type.indexOf('max') > -1) {
                let num = +attr.type.replace('max', '')
                let regex = new RegExp(`^.{0,${num}}$`);
                const b = regex.test(this.formGroupCollection[formId].get(input.key).value);
                if (b) {
                    errors = errors.filter(e => e !== attr.errorMsg);
                } else {
                    errors.push(attr.errorMsg);
                }
            }
            if (attr.type.indexOf('fix') > -1) {
                let num = +attr.type.replace('fix', '')
                let regex = new RegExp(`^.{${num},${num}}$`);
                const b = regex.test(this.formGroupCollection[formId].get(input.key).value);
                if (b) {
                    errors = errors.filter(e => e !== attr.errorMsg);
                } else {
                    errors.push(attr.errorMsg);
                }
            }
        })
        input.errorMsg = errors[0];
    }
    public add(formId: string) {
        const maxY = this._findMaxYCord(formId);
        this.formGroupCollection_template[formId].inputs.forEach(config => {
            const e = <IInputConfig>JSON.parse(JSON.stringify(config));
            const yCord: number = +e.position.row;
            // shift down by maxY+1
            let index = this.formGroupCollection_index[formId];
            e.position.row = String(yCord + this.groupLength(formId) * (index + 1));
            if (e.type !== 'form')
                e.key = e.key + '_' + this.formGroupCollection_index[formId];
            this.updateChildFormKey(e, formId)
            this.formGroupCollection_formInfo[formId].inputs.push(e);
        });
        this.formGroupCollection_index[formId]++;
        this.getFormGroup(formId);
        this.refreshLayout(this.formGroupCollection_formInfo[formId], formId);
    }
    public reset(formId: string) {
        delete this.formGroupCollection[formId];
        delete this.formGroupCollection_formInfo[formId];
        delete this.formGroupCollection_index[formId];
        delete this.formGroupCollection_template[formId];
        delete this.totalRowCollection[formId];
        delete this.groupedRowCollection[formId];
        delete this.totalRowGroupedRowCollection[formId];
        delete this.totalRowGroupedRowCollectionIndex[formId];
    }
    public resetAll() {
        this.formGroupCollection = {};
        this.formGroupCollection_formInfo = {};
        this.formGroupCollection_index = {};
        this.formGroupCollection_template = {};
        this.totalRowCollection = {};
        this.groupedRowCollection = {};
        this.totalRowGroupedRowCollection = {};
        this.totalRowGroupedRowCollectionIndex = {};
    }
    private updateChildFormKey(e: IInputConfig, formId: string) {
        if (e.type === 'form') {
            e.key = e.key + '_' + this.formGroupCollection_index[formId];
            e.form.inputs.forEach(e => {
                this.updateChildFormKey(e, formId)
            })
        }
    }
    private _findMaxYCord(formId: string): number {
        let maxY = 0;
        this.formGroupCollection_formInfo[formId].inputs.forEach(config => {
            if (+config.position.row > maxY) {
                maxY = +config.position.row;
            }
        });
        return maxY;
    }
    public getFormGroup(formId: string): FormGroup {
        if (this._alreadyRegistered(formId)) {
            this.updateExisting(formId)
        } else {
            this.createNew(formId)
        }
        return this.formGroupCollection[formId];
    }
    private _alreadyRegistered(formId: string) {
        return Object.keys(this.formGroupCollection).indexOf(formId) > -1
    }
    private createNew(formId: string): void {
        const fg = new FormGroup({});
        this.formGroupCollection[formId] = fg;
        this.formGroupCollection_formInfo[formId].inputs.forEach(config => {
            let ctrl: AbstractControl;
            ctrl = new FormControl({ value: '', disabled: config.disabled });
            this.formGroupCollection[formId].addControl(config.key, ctrl);
        });
        this.$ready.next(formId);
    }
    private updateExisting(formId: string) {
        this.formGroupCollection_formInfo[formId].inputs.forEach(config => {
            if (this.formGroupCollection[formId].get(config.key)) {
                if (config.disabled)
                    this.formGroupCollection[formId].get(config.key).disable();
            } else {
                // new control
                let ctrl: AbstractControl;
                ctrl = new FormControl({ value: '', disabled: config.disabled });
                this.formGroupCollection[formId].addControl(config.key, ctrl);
            }
        });
        const keys = this.formGroupCollection_formInfo[formId].inputs.map(e => e.key);
        Object.keys(this.formGroupCollection[formId].controls)
            .filter(e => !(keys.indexOf(e) > -1))
            .forEach(e => this.formGroupCollection[formId].removeControl(e))
    }
    public package(formId: string): string {
        return this.formGroupCollection[formId].value;
    }
}
