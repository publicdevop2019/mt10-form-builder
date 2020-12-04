import { Observable } from 'rxjs';

export interface IForm {
    repeatable: boolean;
    disabled?: boolean;
    inputs: IInputConfig[];
    connections?: IConnection[];
}
export interface LoadNextPageEvent {
    formId: string;
    ctrlKey: string;
}
export interface IIdName {
    id: number,
    name: string
}
export interface ISumRep<T> {
    data: T[],
    totalItemCount: number
}
export interface IQueryProvider {
    readByQuery: (num: number, size: number, query?: string, by?: string, order?: string, header?: {}) => Observable<ISumRep<IIdName>>;
}
export interface IInputConfig {
    id?: string;
    type: string;
    sensitive?: boolean;
    autocomplete?: string;
    display: boolean;
    label: string;
    disabled?: boolean; //works for all input types
    readonly?: boolean; //works only for text input
    placeholder?: string;
    key: string;
    options?: IOption[];
    optionOriginal?: any[];
    direction?: string;
    errorMsg?: string;
    position: IPosition;
    required?: boolean,
    form?: IForm;
    bootstrap?: {
        custom: string;
    };
}
export interface ISetValueEvent {
    type: 'setvalue'
    id: number,
    formId: string,
    key: string,
    value: string,
    createAt: number,
}
export interface IAddDynamicFormEvent {
    type: 'addForm'
    id: number,
    formId: string,
    createAt: number,
}
export interface IRemoveDynamicFormEvent {
    type: 'deleteForm'
    id: number,
    formId: string,
    index: string,
    createAt: number,
}
export interface IUploadFileEvent {
    formId: string
    key: string
    files: FileList,
}
export interface IOption {
    label: string
    value: string | number
}
export interface IEvent {
    source?: string;
    show?: string[];
    hide?: string[];
}
export interface IAttribute {
    type: string;
    errorMsg?: string;
    typeExt?: any;
}
export interface IPosition {
    row: string;
    column: string;
}
export interface IConnection {
    target: string;
    source: string;
    condition: ICondition;
    event: IEvent;
}
export interface ICondition {
    hasValue?: boolean;
    valueEquals?: string[];
}
