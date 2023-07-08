import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { IOption, IQueryProvider, IUploadFileEvent } from '../classes/template.interface';
import { Subject } from 'rxjs';
import { ICheckboxControl, ICommonControl, IForm, ISelectControl } from '../classes/template.interface';
import { Utility } from './utility';
@Injectable({
    providedIn: 'root'
})
export class FormInfoService {
    public forms: { [formId: string]: IForm } = {}
    public formGroups: { [formId: string]: FormGroup } = {};
    public i18nLabel: { [key: string]: string } = {};
    public $uploadFile: Subject<IUploadFileEvent> = new Subject()
    public queryProvider: { [key: string]: IQueryProvider } = {};
    private formsCopy: { [formId: string]: IForm } = {};

    public add(formId: string) {
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
            if (inputClone.type !== 'form') {
                inputClone.key = inputClone.key + '_' + count;
            }
            this.updateChildFormKey(inputClone, formId, count)
            this.forms[formId].inputs.push(inputClone);
            //add control
            const result = this.createInputControl(inputClone, formId)
            if (result.checkboxFg) {
                this.formGroups[result.checkboxFg.formId] = result.checkboxFg.fg
            }
            this.formGroups[formId].addControl(inputClone.key, result.ctrl)
        });
    }

    public remove(formId: string, input: ICommonControl) {
        Utility.print("removing form {} 's input {}", formId, input)
        const nextInputs = this.forms[formId].inputs.filter(e => e.key !== input.key)
        //remove control
        this.formGroups[formId].removeControl(input.key);
        if (input.type === 'checkbox') {
            const nestedFormId = this.getCheckboxFormId(formId, input.key);
            const nextFg = {
                ...this.formGroups
            }
            delete nextFg[nestedFormId]
            this.formGroups = nextFg;
        }
        const nextForms = {
            ...this.forms
        }
        nextForms[formId] = {
            ...this.forms[formId],
            inputs: nextInputs
        }
        this.forms = nextForms;
    }
    public init(formInfo: IForm, formId: string) {
        Utility.print('init {} start', formId)
        const backup1 = Utility.copyOf(formInfo);
        const backup2 = Utility.copyOf(formInfo);
        this.formsCopy[formId] = backup1;
        this.forms[formId] = backup2;
        this.initFg(formInfo, formId);
        Utility.print('init {} end', formId)
    }
    public reset(formId: string) {
        delete this.formGroups[formId];
        delete this.formsCopy[formId];
        delete this.forms[formId];
    }
    public resetAll() {
        this.formGroups = {};
        this.formsCopy = {};
        this.forms = {}
    }
    public resetAllExcept(formIds: string[]) {
        Object.keys(this.formGroups).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.formGroups[key] } })
        Object.keys(this.formsCopy).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.formsCopy[key] } })
        Object.keys(this.forms).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.forms[key] } })
    }
    public restore(formId: string, value: any, emitEvent?: boolean) {
        if (emitEvent !== undefined && emitEvent !== null) {
            this.formGroups[formId].patchValue(value, { emitEvent: emitEvent });
        } else {
            this.formGroups[formId].patchValue(value, { emitEvent: false });
        }
    }
    public resetValue(formId: string, key: string, emitEvent?: boolean) {
        const input = this.forms[formId].inputs.find(e => e.key == key);
        const value = this.getControlInitialValue(input)
        const event = emitEvent !== undefined && emitEvent !== null ? { emitEvent: emitEvent } : { emitEvent: false };
        this.formGroups[formId].get(key).reset(value, event)
    }

    public restoreDynamicForm(formId: string, value: any, length: number) {
        for (let i = 0; i < length - 1; i++) {
            this.add(formId);
        }
        this.formGroups[formId].patchValue(value);
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
        this.formGroups[formId].get(key).setErrors({ notUnique: true })
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
                    const oldValue = this.formGroups[var0.checkboxFg.formId].value
                    if (Object.keys(oldValue).length > 0) {
                        var0.checkboxFg.fg.setValue(this.formGroups[var0.checkboxFg.formId].value)
                    }
                    this.formGroups[var0.checkboxFg.formId] = var0.checkboxFg.fg
                    //replace old checkbox control
                    this.formGroups[formId].addControl(e.key, var0.ctrl);
                }
                return var1;
            } else {
                return e;
            }
        })
        this.forms[formId] = form;
    }
    public getCheckboxFormControl(formId: string, key: string, value: string) {
        return this.getCheckboxFormGroup(formId, key).get(value)
    }

    private initFg(formInfo: IForm, formId: string) {
        const newFg = this.createFg(formInfo, formId)
        this.formGroups = {
            ...this.formGroups,
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
        return this.formGroups[this.getCheckboxFormId(formId, key)]
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
                        this.formGroups[formId].get(e.key).enable()
                    } else {
                        this.formGroups[formId].get(e.key).disable()
                    }
                }
                e = {
                    ...e,
                }
                e[key] = value;
            }
            return e;
        });
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
