import { IInputConfig, IForm } from 'mt-form-builder/lib/classes/template.interface';

export function getJsonByCtrlKey(a: IForm, b: string): IInputConfig {
    return a.inputs.find(el => el.key === b);
}
