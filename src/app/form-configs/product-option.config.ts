import { IForm } from 'mt-form-builder/lib/classes/template.interface';

export const PRODUCT_OPTION_FORM: IForm = {
    'repeatable': true,
    'inputs': [
        {
            'type': 'text',
            'display': true,
            'label': 'Enter option title',
            'key': 'optionTitle',
            'position': {
                'row': '0',
                'column': '0',
            },
        },
        {
            'type': 'text',
            'display': true,
            'label': 'Enter option title2',
            'key': 'optionTitle',
            'position': {
                'row': '1',
                'column': '0',
            },
        },
    ]
}