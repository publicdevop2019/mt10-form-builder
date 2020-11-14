import { IForm } from 'mt-form-builder/lib/classes/template.interface';

export const NESTED_FORM: IForm = {
    'repeatable': true,
    'inputs': [
        {
            'type': 'text',
            'display': true,
            'label': 'Product option title',
            'key': 'title',
            'position': {
                'row': '0',
                'column': '0',
            },
        },
        {
            'type': 'text',
            'display': true,
            'label': 'Product option title description',
            'key': 'desc',
            'position': {
                'row': '1',
                'column': '0',
            },
        },
        {
            'type': 'form',
            'display': true,
            'label': '',
            'key': 'optionForm',
            'position': {
                'row': '2',
                'column': '0',
            },
            form: {
                'repeatable': true,
                inputs: [
                    {
                        'type': 'text',
                        'display': true,
                        'label': 'Product option key',
                        'key': 'optionKey',
                        'position': {
                            'row': '0',
                            'column': '0',
                        },
                    },
                    {
                        'type': 'text',
                        'display': true,
                        'label': 'Product option value',
                        'key': 'optionValue',
                        'position': {
                            'row': '0',
                            'column': '0',
                        },
                    },
                    {
                        'type': 'form',
                        'display': true,
                        'label': 'Customer review',
                        'key': 'reviewForm',
                        'position': {
                            'row': '1',
                            'column': '0',
                        },
                        form: {
                            'repeatable': true,
                            inputs: [
                                {
                                    'type': 'text',
                                    'display': true,
                                    'label': 'Name',
                                    'key': 'name',
                                    'position': {
                                        'row': '0',
                                        'column': '0',
                                    },
                                },
                                {
                                    'type': 'text',
                                    'display': true,
                                    'label': 'Review',
                                    'key': 'review',
                                    'position': {
                                        'row': '0',
                                        'column': '0',
                                    },
                                },
                            ]
                        },
                    },
                ],
            },
        },
        {
            'type': 'form',
            'display': true,
            'label': '',
            'key': 'storageForm',
            'position': {
                'row': '3',
                'column': '0',
            },
            form: {
                'repeatable': true,
                inputs: [
                    {
                        'type': 'text',
                        'display': true,
                        'label': 'Storage Key',
                        'key': 'optionKey',
                        'position': {
                            'row': '0',
                            'column': '0',
                        },
                    },
                    {
                        'type': 'text',
                        'display': true,
                        'label': 'Storage value',
                        'key': 'optionValue',
                        'position': {
                            'row': '0',
                            'column': '0',
                        },
                    },
                ],
            }
        }
    ]
}