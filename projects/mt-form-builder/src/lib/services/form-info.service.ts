import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { IOption, IQueryProvider, IUploadFileEvent } from '../classes/template.interface';
import { Subject } from 'rxjs';
import { ICheckboxControl, ICommonControl, IForm, ISelectControl } from '../classes/template.interface';
import { Utility } from './utility';
import { Logger } from './logger';
@Injectable({
    providedIn: 'root'
})
export class FormInfoService {
    public forms: { [formId: string]: { disabled: boolean, repeatable: boolean, inputGrid: ICommonControl[][] } } = {}
    public formGroups: { [formId: string]: FormGroup } = {};
    public i18nLabel: { [key: string]: string } = {};
    public $uploadFile: Subject<IUploadFileEvent> = new Subject()
    public queryProvider: { [key: string]: IQueryProvider } = {};
    private formCopy: { [formId: string]: IForm } = {};

    public add(formId: string) {
        const maxY = this.findMaxRow(formId) || 1; //avoid 0
        const count = Utility.flatMap(this.forms[formId].inputGrid).map(e => {
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
        const inputs = []
        this.formCopy[formId].inputs.forEach(config => {
            const inputClone = Utility.copyOf(config);
            inputClone.position.row = String(maxY * count + (+inputClone.position.row))
            if (inputClone.type !== 'form') {
                inputClone.key = inputClone.key + '_' + count;
            }
            this.updateChildFormKey(inputClone, formId, count)
            inputs.push(inputClone);
            //add control
            const result = this.createInputControl(inputClone, formId, this.formCopy[formId].disabled)
            if (result.checkboxFg) {
                this.formGroups[result.checkboxFg.formId] = result.checkboxFg.fg
            }
            this.formGroups[formId].addControl(inputClone.key, result.ctrl)
        });
        const sortedGrid = this.sortInputs(inputs)
        this.forms[formId].inputGrid.push(...sortedGrid)
    }

    public remove(groupIndex: number, formId: string) {
        Logger.debug("removing form {} 's input {}", formId, groupIndex)
        const var0 = this.forms[formId].inputGrid
        const keys = var0[groupIndex].map(e => e.key)
        this.forms[formId].inputGrid = var0.filter((e, index) => {
            return index !== groupIndex
        })
        //remove control
        keys.forEach(key => {
            this.formGroups[formId].removeControl(key);
            const checkboxInput = var0[groupIndex].find(e => e.key === key && e.type === 'checkbox')
            if (checkboxInput) {
                const nestedFormId = this.getCheckboxFormId(formId, checkboxInput.key);
                const nextFg = {
                    ...this.formGroups
                }
                delete nextFg[nestedFormId]
                this.formGroups = nextFg;
            }
        })
    }

    public init(formInfo: IForm, formId: string) {
        Logger.debug('init {} start', formId)
        const copy1 = Utility.copyOf(formInfo);
        const copy2 = Utility.copyOf(formInfo);
        this.formCopy[formId] = copy1;
        this.forms[formId] = {
            disabled: copy2.disabled,
            repeatable: copy2.repeatable,
            inputGrid: this.sortInputs(copy2.inputs)
        }
        this.initFg(formInfo, formId);
        Logger.debug('init {} end', formId)
    }
    public reset(formId: string) {
        delete this.formGroups[formId];
        delete this.formCopy[formId];
        delete this.forms[formId];
    }
    public resetAll() {
        this.formGroups = {};
        this.formCopy = {};
        this.forms = {}
    }
    public resetAllExcept(formIds: string[]) {
        Object.keys(this.formGroups).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.formGroups[key] } })
        Object.keys(this.formCopy).forEach(key => { if (!(formIds.indexOf(key) > -1)) { delete this.formCopy[key] } })
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
        const input = Utility.flatMap(this.forms[formId].inputGrid).find(e => e.key == key);
        const value = this.getControlInitialValue(input)
        let event: any;
        if (input.type === 'checkbox') {
            event = { emitEvent: true }
        }
        if (emitEvent !== undefined && emitEvent !== null) {
            event = { emitEvent: emitEvent }
        }
        this.formGroups[formId].get(key).reset(value, event)
    }

    public restoreDynamicForm(formId: string, value: any, length: number) {
        for (let i = 0; i < length - 1; i++) {
            this.add(formId);
        }
        this.formGroups[formId].patchValue(value);
    }
    public disableForm(formId: string) {
        this.formGroups[formId].disable()
        this.forms[formId].disabled = true;
        this.forms[formId].inputGrid.forEach(row => {
            row.forEach(input => {
                if (input.type === 'checkbox') {
                    const checkboxFg = this.formGroups[this.getCheckboxFormId(formId, input.key)];
                    checkboxFg.disable();
                }
                input.disabled = true;
            })
        })
    }
    public enableForm(formId: string) {
        this.formGroups[formId].enable();
        this.forms[formId].disabled = false;
        this.forms[formId].inputGrid.forEach(row => {
            row.forEach(input => {
                if (input.type === 'checkbox') {
                    const checkboxFg = this.formGroups[this.getCheckboxFormId(formId, input.key)];
                    checkboxFg.enable();
                }
                input.disabled = false;
            })
        })
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
        this.forms[formId].inputGrid.forEach(row => {
            row.forEach(input => {
                if (input.key === key) {
                    input.errorMsg = error;
                }
            })
        })
    }
    public disableIfMatch(formId: string, keys: string[]) {
        Logger.trace('disable if match')
        this.updateInputAndControl(formId, keys, 'disabled', true, true)
    }
    public disableIfNotMatch(formId: string, keys: string[]) {
        Logger.trace('disable if not match')
        this.updateInputAndControl(formId, keys, 'disabled', true, false)
    }
    public enableIfMatch(formId: string, keys: string[]) {
        Logger.trace('enable if match')
        this.updateInputAndControl(formId, keys, 'disabled', false, true)
    }
    public enableIfNotMatch(formId: string, keys: string[]) {
        Logger.trace('enable if not match')
        this.updateInputAndControl(formId, keys, 'disabled', false, false)
    }
    public showIfMatch(formId: string, keys: string[]) {
        Logger.trace('show if match')
        this.updateInputAndControl(formId, keys, 'display', true, true)
    }

    public showIfNotMatch(formId: string, keys: string[]) {
        Logger.trace('show if not match')
        this.updateInputAndControl(formId, keys, 'display', true, false)
    }
    public hideIfMatch(formId: string, keys: string[]) {
        Logger.trace('hide if match')
        this.updateInputAndControl(formId, keys, 'display', false, true)
    }
    public hideIfNotMatch(formId: string, keys: string[]) {
        Logger.trace('hide if not match')
        this.updateInputAndControl(formId, keys, 'display', false, false)
    }
    public updateOption(formId: string, key: string, next: IOption[]) {
        this.forms[formId].inputGrid.forEach(row => {
            row.forEach(input => {
                if (input.key === key) {
                    (input as ISelectControl).options = next
                    if (input.type === 'checkbox') {
                        //update fg as well
                        const var0 = this.createInputControl(input, formId, input.disabled);
                        //copy old value to new fg if exist
                        const oldValue = this.formGroups[var0.checkboxFg.formId].value
                        if (Object.keys(oldValue).length > 0) {
                            var0.checkboxFg.fg.setValue(this.formGroups[var0.checkboxFg.formId].value)
                        }
                        this.formGroups[var0.checkboxFg.formId] = var0.checkboxFg.fg
                        //replace old checkbox control
                        this.formGroups[formId].addControl(input.key, var0.ctrl);
                    }
                }
            })
        })
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
        Logger.trace("creating form group: {}", formInfo)
        const nextFg = {}
        const parentFg = {};
        formInfo.inputs.forEach(config => {
            const result = this.createInputControl(config, formId, formInfo.disabled);
            if (result.checkboxFg) {
                nextFg[result.checkboxFg.formId] = result.checkboxFg.fg;
            }
            parentFg[config.key] = result.ctrl;
        });
        nextFg[formId] = new FormGroup(parentFg);
        return nextFg;
    }

    private sortInputs(inputs: ICommonControl[]): ICommonControl[][] {
        const nextImmutable: ICommonControl[][] = [];
        inputs.forEach(ee => {
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
        return nextImmutable;
    }
    private findMaxRow(formId: string): number {
        let maxY = 0;
        this.formCopy[formId].inputs.forEach(config => {
            if (+config.position.row > maxY) {
                maxY = +config.position.row;
            }
        });
        return maxY;
    }
    private createInputControl(input: ICommonControl, formId: string, formDisabled: boolean): { checkboxFg?: { formId: string, fg: FormGroup }, ctrl: AbstractControl } {
        const value = this.getControlInitialValue(input)
        Logger.trace("form disabled: {} input disabled: {}", formDisabled, input.disabled)
        const disabled = !!(formDisabled || input.disabled)
        Logger.debug("creating control with key: {} value: {} disabled: {}", input.key, value, disabled)
        const parentCtrl: AbstractControl = new FormControl({ value: value, disabled: disabled });
        Logger.debugObject("created control", parentCtrl)
        if (input.type !== 'checkbox') {
            return {
                ctrl: parentCtrl
            };
        } else {
            const childFgCtrls = {};
            const _config = (input as ICheckboxControl);
            _config.options.forEach(e => {
                childFgCtrls[e.value] = new FormControl({ value: false, disabled: !!(formDisabled || input.disabled) });
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
    private updateInputAndControl(formId: string, keys: string[], key: 'display' | 'disabled', value: boolean, oppsite: boolean) {
        this.forms[formId].inputGrid.forEach(row => {
            row.forEach(input => {
                if (keys.includes(input.key) === oppsite) {
                    if (key === 'disabled') {
                        //also update form control
                        if (value === true) {
                            Logger.debug('disabling control, key {}', input.key)
                            this.formGroups[formId].get(input.key).disable()
                            if (input.type === 'checkbox') {
                                this.formGroups[this.getCheckboxFormId(formId, input.key)].disable()
                            }
                        } else {
                            Logger.debug('enabling control, key {}', input.key)
                            this.formGroups[formId].get(input.key).enable()
                            if (input.type === 'checkbox') {
                                this.formGroups[this.getCheckboxFormId(formId, input.key)].enable()
                            }
                        }
                    }
                    input[key] = value;
                    Logger.trace("value after update is {}", input)
                }
            })
        })
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
