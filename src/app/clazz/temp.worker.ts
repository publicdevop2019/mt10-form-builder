import { FormGroup } from '@angular/forms';
import { CONST } from '../constant/constant';
import { getJsonByCtrlKey } from './util';
import { IAttribute, IForm, IConnection, IEvent, IInputConfig, ICondition, IPosition } from 'mt-form-builder/lib/classes/template.interface';
/**
 *@description create attribute, connection and template json
 */
export class TempWorker {
    private _temps: IForm;
    constructor(temps: IForm) {
        this._temps = temps;
    }
    /**
     * @description add attribute to input field
     *
     */
    public attributeMapper(attr: string, ctrlKey: string, extraInfo?: any) {
        if (attr === CONST.ATTR_MANDATORY) {
            const newAttr = {
                type: CONST.ATTRIBUTE_REQUIRED,
                errorMsg: getJsonByCtrlKey(this._temps, ctrlKey).label + CONST.REQUIRED
            };
            this._pushAttr(newAttr, getJsonByCtrlKey(this._temps, ctrlKey));
        } else if (attr === CONST.ATTR_NUM_ONLY) {
            const newAttr = {
                type: CONST.ATTRIBUTE_NUMONLY,
                errorMsg: CONST.ERROR_MSG_ONLY_NUMB_ALLOWED
            };
            this._pushAttr(newAttr, getJsonByCtrlKey(this._temps, ctrlKey));
        } else if (attr === CONST.ATTR_LENGTH_MIN) {
            const newAttr = <IAttribute>{
                type: CONST.ATTRIBUTE_MIN_LENGTH,
                errorMsg: CONST.ERROR_MSG_MIN_LENGTH,
                typeExt: extraInfo,
            };
            this._pushAttr(newAttr, getJsonByCtrlKey(this._temps, ctrlKey));
        } else if (attr === CONST.ATTR_LENGTH_MAX) {
            const newAttr = <IAttribute>{
                type: CONST.ATTRIBUTE_MAX_LENGTH,
                typeExt: extraInfo,
                errorMsg: CONST.ERROR_MSG_MAX_LENGTH,
            };
            this._pushAttr(newAttr, getJsonByCtrlKey(this._temps, ctrlKey));
        } else {
            console.error('unknown attribute name:' + attr);
        }
    }
    private _pushAttr(newAttr: IAttribute, config: IInputConfig) {
        if (config.attributes) {
        } else {
            config.attributes = [];
        }
        config.attributes.push(newAttr);
    }
    public updateJSON(generatedBR: IConnection) {
        if (this._temps.connections) {
            this._temps.connections.push(generatedBR);
        } else {
            this._temps.connections = [generatedBR];
        }
    }
    public genSingleCon(targetKey: string, sourceKey: string, extraInfo?: string[]): { [description: string]: IConnection } {
        const results: { [description: string]: IConnection } = {};
        const shell = <IConnection>{
            target: targetKey,
            source: sourceKey,
            condition: <ICondition>{}
        };
        // BR 000 show when has value is true
        shell.condition.hasValue = true;
        const rule0 = `show ${this._keyLookup(targetKey)} if ${this._keyLookup(sourceKey)} has value else hide`;
        shell.event = <IEvent>{ show: [targetKey] };
        results[rule0] = <IConnection>JSON.parse(JSON.stringify(shell));
        delete shell.event;
        // BR 001 hide when has value is true
        const rule1 = `hide ${this._keyLookup(targetKey)} if ${this._keyLookup(sourceKey)} has value else show`;
        shell.event = <IEvent>{ hide: [targetKey] };
        results[rule1] = <IConnection>JSON.parse(JSON.stringify(shell));
        delete shell.event;

        delete shell.condition.hasValue;
        shell.condition.valueEquals = extraInfo;
        const rule4 = `show ${this._keyLookup(targetKey)} if ${this._keyLookup(sourceKey)} has specific value else hide`;
        shell.event = <IEvent>{ show: [targetKey] };
        results[rule4] = <IConnection>JSON.parse(JSON.stringify(shell));
        delete shell.event;
        // BR 001 hide when has value is true
        const rule5 = `hide ${this._keyLookup(targetKey)} if ${this._keyLookup(sourceKey)} has specific value else show`;
        shell.event = <IEvent>{ hide: [targetKey] };
        results[rule5] = <IConnection>JSON.parse(JSON.stringify(shell));
        delete shell.event;

        return results;
    }
    /**
     * generate configuration based on user inputs
     * @param systemFG 
     * @param dynamicFG 
     * @param activeBtnName 
     * @param nextCoordinate 
     */
    public getTemp(systemFG: FormGroup, dynamicFG: FormGroup, activeBtnName: string, nextCoordinate: IPosition): IInputConfig {
        const autoGenKey = 'key_' + <string>systemFG.get('workshop_InputName').value;
        const textTemp = <IInputConfig>{
            type: 'text',
            label: systemFG.get('workshop_InputName').value,
            key: autoGenKey
        };
        const radioTemp = <IInputConfig>{
            type: 'radio',
            label: systemFG.get('workshop_InputName').value,
            key: autoGenKey
        };
        const checkboxTemp = <IInputConfig>{
            type: 'checkbox',
            label: systemFG.get('workshop_InputName').value,
            key: autoGenKey
        };
        const selectTemp = <IInputConfig>{
            type: 'select',
            label: systemFG.get('workshop_InputName').value,
            key: autoGenKey
        };
        ['radioWizard'].indexOf(activeBtnName) > -1 ? this._addOption(radioTemp, dynamicFG) : this._noOp();
        ['checkboxWizard'].indexOf(activeBtnName) > -1 ? this._addOption(checkboxTemp, dynamicFG) : this._noOp();
        ['selectWizard'].indexOf(activeBtnName) > -1 ? this._addValueList(selectTemp, dynamicFG) : this._noOp();
        const tempCollection = {
            'textWizard': textTemp,
            'radioWizard': radioTemp,
            'checkboxWizard': checkboxTemp,
            'selectWizard': selectTemp,
        };
        const rawTemp: IInputConfig = tempCollection[activeBtnName];
        rawTemp.position = nextCoordinate;
        return rawTemp;
    }
    private _addOption(input: IInputConfig, systemFG: FormGroup) {
        Object.keys(systemFG.controls).filter(el => el.indexOf('key_option') > -1).forEach(ctrl => {
            if (input.options) {
            } else {
                input.options = [];
            }
            input.options.push(systemFG.get(ctrl).value as string);
        });
    }
    private _addValueList(input: IInputConfig, systemFG: FormGroup) {
        const valueList: string[] = Object.keys(systemFG.controls)
            .filter(el => el.indexOf('key_option') > -1).map(el => systemFG.get(el).value);
        input.options = valueList;
    }
    private _keyLookup(input: string): string {
        console.dir(input)
        console.dir(this._temps.inputs)
        return this._temps.inputs.find(e => e.key === input).label;
    }
    private _noOp(): void {

    }
}
