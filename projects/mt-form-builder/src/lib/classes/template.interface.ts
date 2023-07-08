import { Observable } from 'rxjs';
export interface IForm {
    repeatable: boolean;
    disabled?: boolean;
    inputs: (ITextControl | ISelectControl | ICheckboxControl | IRadioControl)[];
}
export interface ICommonControl {
    type: 'text' | 'radio' | 'checkbox' | 'select' | 'file' | 'imageUpload' | 'paginated-select' | 'virtual-select' | 'date-picker' | 'form';
    display: boolean;
    readonly?: boolean; //works only for text input
    disabled?: boolean; //works for all input types
    errorMsg?: string;
    required?: boolean,
    form?: IForm;
    position: IPosition;
    key: string;
    label: string;
}
export interface ITextControl extends ICommonControl {
    sensitive?: boolean;
    autocomplete?: string;
    placeholder?: string;
}

export interface ISelectControl extends ICommonControl {
    multiple: boolean
    options: IOption[];
    queryPrefix?: string;
}

export interface ICheckboxControl extends ICommonControl {
    options: IOption[];
    direction?: 'row' | 'column';
}

export interface IRadioControl extends ICommonControl {
    options: IOption[];
    direction?: 'row' | 'column';
}

export interface IOption {
    label: string
    value: string
}
export interface IPosition {
    row: string;
    column: string;
}
export interface IUploadFileEvent {
    formId: string
    key: string
    files: FileList,
}
export interface IIdName {
    id: string,
    name: string,
    description?: string
}
export interface ISumRep<T> {
    data: T[],
    totalItemCount: number
}
export interface IQueryProvider {
    readByQuery: (num: number, size: number, query?: string, by?: string, order?: string, header?: {}) => Observable<ISumRep<IIdName>>;
}