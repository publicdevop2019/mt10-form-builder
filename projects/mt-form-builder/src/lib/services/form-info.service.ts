import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { IOption, IQueryProvider, IUploadFileEvent } from '../classes/template.interface';
import { Subject } from 'rxjs';
import { ICheckboxControl, ICommonControl, IForm, ISelectControl } from '../classes/template.interface';
import { Utility } from './utility';
/**
 * @description this service is exported to outside projects
 *
 */
@Injectable({
    providedIn: 'root'
})
export class FormInfoService {
    public sortedForms: { [formId: string]: ICommonControl[][] } = {}
    public forms: { [formId: string]: IForm } = {}


    public formGroupCollection: { [formId: string]: FormGroup } = {};
    public formsCopy: { [formId: string]: IForm } = {};



    public i18nLabel: { [key: string]: string } = {};
    public $uploadFile: Subject<IUploadFileEvent> = new Subject()
    public queryProvider: { [key: string]: IQueryProvider } = {};

    public add(formId: string) {
        const maxY = this.findMaxRow(formId) || 1; //avoid 0
        const count = this.forms[formId].inputs.map(e => {
            if (e.key.includes("_")) {
                return +e.key.split("_")[1]
            } else {
                return 0;
            }
        }).reduce((a, b) => {
            if (a > b) {
                return a
            } else {
                return b
            }
        }) + 1;
        this.formsCopy[formId].inputs.forEach(config => {
            const inputClone = <ICommonControl>JSON.parse(JSON.stringify(config));
            inputClone.position.row = String(maxY * count + (+inputClone.position.row))
            if (inputClone.type !== 'form') {
                inputClone.key = inputClone.key + '_' + count;
            }
            this.updateChildFormKey(inputClone, formId, count)
            this.forms[formId].inputs.push(inputClone);
            //add control
            const result = this.createInputControl(inputClone, formId)
            if (result.checkboxFg) {
                this.formGroupCollection[result.checkboxFg.formId] = result.checkboxFg.fg
            }
            this.formGroupCollection[formId].addControl(inputClone.key, result.ctrl)
        });
        this.sortForm(this.forms[formId] as IForm, formId);
    }

    public remove(groupIndex: number, formId: string) {
        const var0 = this.sortedForms[formId]
        const keys = var0[groupIndex].map(e => e.key)
        const nextInputs = this.forms[formId].inputs.filter(e => !keys.includes(e.key))
        //remove control
        keys.forEach(key => {
            this.formGroupCollection[formId].removeControl(key);
            const checkboxInput = var0[groupIndex].find(e => e.key === key && e.type === 'checkbox')
            if (checkboxInput) {
                const nestedFormId = this.getCheckboxFormId(formId, checkboxInput.key);
                const nextFg = {
                    ...this.formGroupCollection
                }
                delete nextFg[nestedFormId]
                this.formGroupCollection = nextFg;
            }
        })
        const nextForms = {
            ...this.forms
        }
        nextForms[formId] = {
            ...this.forms[formId],
            inputs: nextInputs
        }
        this.forms = nextForms;
        this.sortForm(this.forms[formId] as IForm, formId);
    }
    public init(formInfo: IForm, formId: string) {
        Utility.print('init {} start', formId)
        const backup1 = Utility.copyOf(formInfo);
        const backup2 = Utility.copyOf(formInfo);
        this.formsCopy[formId] = backup1;
        this.forms[formId] = backup2;
        this.sortForm(this.forms[formId] as IForm, formId);
        this.initFg(formInfo, formId);
        Utility.print('init {} end', formId)
    }
    public reset(formId: string) {
        delete this.formGroupCollection[formId];
        delete this.formsCopy[formId];
        delete this.sortedForms[formId];
        delete this.forms[formId];
    }
    public resetAll() {
        this.formGroupCollection = {};
        this.formsCopy = {};
        this.sortedForms = {}
        this.forms = {}
    }
    public resetAllExcept(formIds: string[]) {
        Object.keys(this.formGroupCollection).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.formGroupCollection[key] } })
        Object.keys(this.formsCopy).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.formsCopy[key] } })
        Object.keys(this.sortedForms).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.sortedForms[key] } })
        Object.keys(this.forms).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.forms[key] } })
    }
    public restore(formId: string, value: any, emitEvent?: boolean) {
        if (emitEvent !== undefined && emitEvent !== null) {
            this.formGroupCollection[formId].patchValue(value, { emitEvent: emitEvent });
        } else {
            this.formGroupCollection[formId].patchValue(value, { emitEvent: false });
        }
    }
    public resetValue(formId: string, key: string, emitEvent?: boolean) {
        const input = this.forms[formId].inputs.find(e => e.key == key);
        const value = this.getControlInitialValue(input)
        const event = emitEvent !== undefined && emitEvent !== null ? { emitEvent: emitEvent } : { emitEvent: false };
        this.formGroupCollection[formId].get(key).reset(value, event)
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
    public updateError(formId: string, key: string, error: string) {
        this.forms[formId].inputs = this.forms[formId].inputs.map(e => {
            if (key === e.key) {
                return {
                    ...e,
                    errorMsg: error
                }
            }
            return e;
        });
        this.formGroupCollection[formId].get(key).setErrors({ notUnique: true })
        this.sortForm(this.forms[formId] as IForm, formId);
    }
    public disableIfMatch(formId: string, keys: string[]) {
        this.updateInputAndControl(formId, keys, 'disable', true, true)
    }
    public disableIfNotMatch(formId: string, keys: string[]) {
        this.updateInputAndControl(formId, keys, 'disable', true, false)
    }
    public enableIfMatch(formId: string, keys: string[]) {
        this.updateInputAndControl(formId, keys, 'disable', false, true)
    }
    public enableIfNotMatch(formId: string, keys: string[]) {
        this.updateInputAndControl(formId, keys, 'disable', false, false)
    }
    public showIfMatch(formId: string, keys: string[]) {
        this.updateInputAndControl(formId, keys, 'display', true, true)
    }

    public showIfNotMatch(formId: string, keys: string[]) {
        this.updateInputAndControl(formId, keys, 'display', true, false)
    }
    public hideIfMatch(formId: string, keys: string[]) {
        this.updateInputAndControl(formId, keys, 'display', false, true)
    }
    public resetControls(formId: string, keys: string[]) {
        keys.forEach(k => {
            this.formGroupCollection[formId].get(k)?.reset();
        })
    }
    public hideIfNotMatch(formId: string, keys: string[]) {
        this.updateInputAndControl(formId, keys, 'display', false, false)
    }
    public updateOption(formId: string, key: string, next: IOption[]) {
        this.forms = {
            ...this.forms
        }
        const form = this.forms[formId]
        form.inputs = form.inputs.map(e => {
            if (e.key === key) {
                const var1 = {
                    ...e,
                    options: next
                } as ISelectControl

                if (e.type === 'checkbox') {
                    //update fg as well
                    const var0 = this.createInputControl(var1, formId);
                    //copy old value to new fg if exist
                    const oldValue = this.formGroupCollection[var0.checkboxFg.formId].value
                    if (Object.keys(oldValue).length > 0) {
                        var0.checkboxFg.fg.setValue(this.formGroupCollection[var0.checkboxFg.formId].value)
                    }
                    this.formGroupCollection[var0.checkboxFg.formId] = var0.checkboxFg.fg
                    //replace old checkbox control
                    this.formGroupCollection[formId].addControl(e.key, var0.ctrl);
                }
                return var1;
            } else {
                return e;
            }
        })
        this.forms[formId] = form;
        this.sortForm(this.forms[formId], formId)
    }
    public getCheckboxFormControl(formId: string, key: string, value: string) {
        return this.getCheckboxFormGroup(formId, key).get(value)
    }
    /**
     * update sorted form, immutable, this method should be called everytime there's a change of form.
     * 
     * NOTE: this cannot be converted to real time function as it will cause input freeze issue
     * @param formInfo form info
     * @param formId form id
     */
    private sortForm(formInfo: IForm, formId: string): void {
        const nextImmutable: ICommonControl[][] = [];
        formInfo.inputs.forEach(ee => {
            const arr = nextImmutable.find(e => e && e[0] && e[0].position.row === ee.position.row)
            if (arr) {
                arr.push(ee)
            } else {
                nextImmutable.push([ee])
            }
            nextImmutable.forEach(row => {
                row = [...row.sort((a, b) => {
                    return (+a.position.row) - (+b.position.row);
                })]
            })
            nextImmutable.forEach(e => {
                e = [...e.sort((a, b) => {
                    return (+a.position.column) - (+b.position.column);
                })]
            })
        });
        const next = {
            ...this.sortedForms,
        }
        next[formId] = nextImmutable
        this.sortedForms = next;
    }

    private initFg(formInfo: IForm, formId: string) {
        const newFg = this.createFg(formInfo, formId)
        this.formGroupCollection = {
            ...this.formGroupCollection,
            ...newFg
        }
    }

    private updateChildFormKey(e: ICommonControl, formId: string, count: number) {
        if (e.type === 'form') {
            e.key = e.key + '_' + count;
            e.form.inputs.forEach(e => {
                this.updateChildFormKey(e, formId, count)
            })
        }
    }
    private findMaxRow(formId: string): number {
        let maxY = 0;
        this.formsCopy[formId].inputs.forEach(config => {
            if (+config.position.row > maxY) {
                maxY = +config.position.row;
            }
        });
        return maxY;
    }
    private createFg(formInfo: IForm, formId: string): { [formId: string]: FormGroup } {
        const nextFg = {}
        const parentFg = {};
        formInfo.inputs.forEach(config => {
            const result = this.createInputControl(config, formId);
            if (result.checkboxFg) {
                nextFg[result.checkboxFg.formId] = result.checkboxFg.fg;
            }
            parentFg[config.key] = result.ctrl;
        });
        nextFg[formId] = new FormGroup(parentFg);
        return nextFg;
    }
    private createInputControl(input: ICommonControl, formId: string): { checkboxFg?: { formId: string, fg: FormGroup }, ctrl: AbstractControl } {
        const value = this.getControlInitialValue(input)
        const parentCtrl: AbstractControl = new FormControl({ value: value, disabled: input.disabled });
        if (input.type !== 'checkbox') {
            return {
                ctrl: parentCtrl
            };
        } else {
            const childFgCtrls = {};
            const _config = (input as ICheckboxControl);
            _config.options.forEach(e => {
                childFgCtrls[e.value] = new FormControl(false);
            });
            const checkboxFgId = this.getCheckboxFormId(formId, input.key)
            const checkboxFg = new FormGroup(childFgCtrls);
            //sub for change to avoid not subscribed when setting value
            parentCtrl.valueChanges.subscribe(next => {
                const nextValue = {};
                if (typeof next === 'boolean') {
                    //single
                    _config.options.forEach(e => {
                        nextValue[e.value] = next;
                    });
                    checkboxFg.patchValue(nextValue, { emitEvent: false })
                }
                else if (next === null || next === undefined) {
                    checkboxFg.reset(next, { emitEvent: false })
                } else {
                    //multiple
                    _config.options.forEach(e => {
                        nextValue[e.value] = this.checkboxSelected(next, e);
                    });
                    checkboxFg.patchValue(nextValue, { emitEvent: false })
                }
            });

            checkboxFg.valueChanges.subscribe(next => {
                const emitValue = [];
                Object.keys(next).forEach(key => {
                    if (next[key]) {
                        emitValue.push(key)
                    }
                })
                if (_config.label) {
                    parentCtrl.setValue(emitValue)
                } else {
                    parentCtrl.setValue(emitValue.length >= 1)
                }
            });
            return {
                checkboxFg: {
                    formId: checkboxFgId,
                    fg: checkboxFg
                },
                ctrl: parentCtrl
            };
        }
    }
    private getCheckboxFormGroup(formId: string, key: string) {
        return this.formGroupCollection[this.getCheckboxFormId(formId, key)]
    }
    private getCheckboxFormId(formId: string, key: string) {
        return formId + "_" + key
    }
    private checkboxSelected(next: string[], option: IOption) {
        return next.includes(option.value as string)
    }
    private updateInputAndControl(formId: string, keys: string[], key: 'display' | 'disable', value: boolean, oppsite: boolean) {
        this.forms[formId].inputs = this.forms[formId].inputs.map(e => {
            if (keys.includes(e.key) === oppsite) {
                if (key === 'disable') {
                    //also update form control
                    if (value === true) {
                        this.formGroupCollection[formId].get(e.key).enable()
                    } else {
                        this.formGroupCollection[formId].get(e.key).disable()
                    }
                }
                e = {
                    ...e,
                }
                e[key] = value;
            }
            return e;
        });
        this.sortForm(this.forms[formId] as IForm, formId);
    }
    private getControlInitialValue(input: ICommonControl): any {
        if (input.type === 'text' || input.type === 'radio') {
            return ''
        } else if (input.type === 'select' || input.type === 'paginated-select' || input.type === 'virtual-select') {
            if ((input as ISelectControl).multiple) {
                return []
            } else {
                return ''
            }
        } else if (input.type === 'checkbox') {
            if (input.label) {
                return []
            } else {
                return false
            }
        } else {
            return undefined;
        }
    }
}
