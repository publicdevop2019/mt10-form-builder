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
export interface IInputConfig {
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
    direction?: string;
    errorMsg?: string;
    position: IPosition;
    attributes?: IAttribute[];
    form?: IForm;
    bootstrap?: {
        custom: string;
    };
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
