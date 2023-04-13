import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { IForm, IInputConfig, IOption, IQueryProvider, IUploadFileEvent, LoadNextPageEvent } from '../classes/template.interface';
import { Observable, Subject } from 'rxjs';
import { emit } from 'process';
import { filter, take } from 'rxjs/operators';
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
    public i18nLabel: { [key: string]: string } = {};
    public $ready: Subject<string> = new Subject();
    public $refresh: Subject<void> = new Subject()
    public $uploadFile: Subject<IUploadFileEvent> = new Subject()
    public queryProvider: { [key: string]: IQueryProvider } = {};
    /** based on coordinate slice rows */
    private refreshLayout(formInfo: IForm, formId: string): void {
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
        this.update(formId)
    }
    public remove(groupIndex: string, formId: string) {
        let removeRows: string[] = this.totalRowGroupedRowCollectionIndex[formId][groupIndex];
        let var0: string[] = []
        removeRows.forEach(e => {
            var0.push(...this.layoutCollection[formId][e].map(el => el.key))
        });
        this.formGroupCollection_formInfo[formId].inputs = this.formGroupCollection_formInfo[formId].inputs.filter(e => var0.indexOf(e.key) === -1);
        this.update(formId)
    }
    public update(formId: string) {
        this.refreshLayout(this.formGroupCollection_formInfo[formId], formId);
        return this.updateFormGroup(formId);
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
        delete this.layoutCollection[formId];
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
        this.layoutCollection = {}
    }
    public resetAllExcept(formIds: string[]) {
        Object.keys(this.formGroupCollection).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.formGroupCollection[key] } })
        Object.keys(this.formGroupCollection_formInfo).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.formGroupCollection_formInfo[key] } })
        Object.keys(this.formGroupCollection_index).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.formGroupCollection_index[key] } })
        Object.keys(this.formGroupCollection_template).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.formGroupCollection_template[key] } })
        Object.keys(this.totalRowCollection).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.totalRowCollection[key] } })
        Object.keys(this.groupedRowCollection).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.groupedRowCollection[key] } })
        Object.keys(this.totalRowGroupedRowCollection).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.totalRowGroupedRowCollection[key] } })
        Object.keys(this.totalRowGroupedRowCollectionIndex).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.totalRowGroupedRowCollectionIndex[key] } })
        Object.keys(this.layoutCollection).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.layoutCollection[key] } })
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
    private updateFormGroup(formId: string): FormGroup {
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
            if (config.type === 'checkbox') {
                if (config.label) {
                    ctrl = new FormControl({ value: [], disabled: config.disabled });
                } else {
                    ctrl = new FormControl({ value: false, disabled: config.disabled });
                }
            } else {
                ctrl = new FormControl({ value: '', disabled: config.disabled });
            }
            this.formGroupCollection[formId].addControl(config.key, ctrl);
        });
        this.$ready.next(formId);
    }
    private updateExisting(formId: string) {
        this.formGroupCollection_formInfo[formId].inputs.forEach(config => {
            if (this.formGroupCollection[formId].get(config.key)) {
                if (config.disabled)
                    this.formGroupCollection[formId].get(config.key).disable({ emitEvent: false });
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
    public restore(formId: string, value: any, emitEvent?: boolean) {
        if (emitEvent !== undefined && emitEvent !== null) {
            this.formGroupCollection[formId].patchValue(value, { emitEvent: emitEvent });
        } else {
            this.formGroupCollection[formId].patchValue(value, { emitEvent: false });
        }
    }
    public restoreDynamicForm(formId: string, value: any, length: number) {
        for (let i = 0; i < length - 1; i++) {
            this.add(formId);
        }
        this.formGroupCollection[formId].patchValue(value);
    }
    public parsePayloadArr(inputs: Array<string | number>, ctrlName: string) {
        let parsed = {};
        inputs.forEach((e, index) => {
            if (index === 0) {
                parsed[ctrlName] = e;
            } else {
                parsed[ctrlName + '_' + (index - 1)] = e;
            }
        })
        return parsed;
    }
    public disableIfMatch(formId: string, keys: string[]) {
        this.formGroupCollection_formInfo[formId].inputs.forEach(e => {
            if (keys.includes(e.key)) {
                e.disabled = true;
                //also update form control
                this.formGroupCollection[formId].get(e.key).disable();
            }
        });
    }
    public disableIfNotMatch(formId: string, keys: string[]) {
        this.formGroupCollection_formInfo[formId].inputs.forEach(e => {
            if (!keys.includes(e.key)) {
                e.disabled = true;
                //also update form control
                this.formGroupCollection[formId].get(e.key).disable();
            }
        });
    }
    public enableIfMatch(formId: string, keys: string[]) {
        this.formGroupCollection_formInfo[formId].inputs.forEach(e => {
            if (keys.includes(e.key)) {
                e.disabled = false;
                //also update form control
                this.formGroupCollection[formId].get(e.key).enable();
            }
        });
    }
    public enableIfNotMatch(formId: string, keys: string[]) {
        this.formGroupCollection_formInfo[formId].inputs.forEach(e => {
            if (!keys.includes(e.key)) {
                e.disabled = false;
                //also update form control
                this.formGroupCollection[formId].get(e.key).enable();
            }
        });
    }
    public showIfMatch(formId: string, key: string[]) {
        this.formGroupCollection_formInfo[formId].inputs.forEach(e => {
            if (key.includes(e.key)) {
                e.display = true;
            }
        });
    }
    public showIfNotMatch(formId: string, key: string[]) {
        this.formGroupCollection_formInfo[formId].inputs.forEach(e => {
            if (!key.includes(e.key)) {
                e.display = true;
            }
        });
    }
    public hideIfMatch(formId: string, key: string[]) {
        this.formGroupCollection_formInfo[formId].inputs.forEach(e => {
            if (key.includes(e.key)) {
                e.display = false;
            }
        });
    }
    public hideIfNotMatch(formId: string, key: string[]) {
        this.formGroupCollection_formInfo[formId].inputs.forEach(e => {
            if (!key.includes(e.key)) {
                e.display = false;
            }
        });
    }
    public hideAndResetIfMatch(formId: string, key: string[]) {
        this.formGroupCollection_formInfo[formId].inputs.forEach(e => {
            if (key.includes(e.key)) {
                e.display = false;
                this.formGroupCollection[formId].get(e.key).reset(undefined, { emitEvent: false })
            }
        });
    }
    public hideAndResetIfNotMatch(formId: string, key: string[]) {
        this.formGroupCollection_formInfo[formId].inputs.forEach(e => {
            if (!key.includes(e.key)) {
                e.display = false;
                this.formGroupCollection[formId].get(e.key).reset(undefined, { emitEvent: false })
            }
        });
    }
    public updateOption(formId: string, key: string, next: IOption[]) {
        this.formGroupCollection_formInfo[formId].inputs.forEach(e => {
            if (e.key === key) {
                e.options = next;
            }
        })
    }
    public formCreated(formId: string) {
        return this.$ready.pipe(filter(e => e === formId)).pipe(take(1))
    }
}
