import { IForm } from 'mt-form-builder/lib/classes/template.interface';

export const USER_CREATION: IForm = {
    'repeatable': true,
    'inputs': [
        {
            'type': 'text',
            'display': true,
            'label': 'First name',
            'key': 'firstname',
            'position': {
                'row': '0',
                'column': '0',
            },
        },
        {
            'type': 'text',
            'display': true,
            'label': 'Middle name',
            'key': 'middlename',
            'position': {
                'row': '1',
                'column': '0',
            }
        },
        {
            'type': 'text',
            'display': true,
            'label': 'Last name',
            'readonly': true,
            'key': 'Last name',
            'position': {
                'row': '2',
                'column': '0',
            }
        },
        {
            'type': 'radio',
            'display': true,
            'label': 'Gender',
            'key': 'Gender',
            'options': [
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
            ],
            'position': {
                'row': '3',
                'column': '0',
            },
        },
        {
            'type': 'radio',
            'label': 'Gender2',
            'display': true,
            'key': 'Gender2',
            'disabled': true,
            'options': [
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
            ],
            'position': {
                'row': '4',
                'column': '0',
            }
        },
        {
            'type': 'radio',
            'label': 'Gender3',
            'display': true,
            'key': 'Gender3',
            'options': [
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
            ],
            "direction": 'row',
            'position': {
                'row': '5',
                'column': '0',
            },
        },
        {
            'type': 'checkbox',
            'display': true,
            'label': 'What type of car do you own?',
            'key': 'What type of car do you own?',
            'options': [
                { label: 'Hyundai', value: 'Hyundai' },
                { label: 'Honda', value: 'Honda' },
                { label: 'Audi', value: 'Audi' },
                { label: 'BMW', value: 'BMW' },
            ],
            'position': {
                'row': '6',
                'column': '0',
            },
        },
        {
            'type': 'checkbox',
            'display': true,
            'label': 'What type of car do you own?',
            'key': 'What type of car do you own?3',
            'options': [
                { label: 'Hyundai', value: 'Hyundai' },
                { label: 'Honda', value: 'Honda' },
                { label: 'Audi', value: 'Audi' },
                { label: 'BMW', value: 'BMW' },
            ],
            "direction": 'row',
            'position': {
                'row': '7',
                'column': '0',
            },
        },
        {
            'type': 'checkbox',
            'display': true,
            'label': 'What type of car do you own?',
            'key': 'What type of car do you own?2',
            'disabled': true,
            'options': [
                { label: 'Hyundai', value: 'Hyundai' },
                { label: 'Honda', value: 'Honda' },
                { label: 'Audi', value: 'Audi' },
                { label: 'BMW', value: 'BMW' },
            ],
            'position': {
                'row': '8',
                'column': '0',
            }
        },
        {
            'type': 'select',
            'display': true,
            'label': 'Provice',
            'key': 'Provice',
            'options': [
                { label: 'Ontario', value: 'Ontario' },
                { label: 'Quebec', value: 'Quebec' },
                { label: 'British', value: 'British' },
            ],
            'position': {
                'row': '9',
                'column': '0',
            },
        },
        {
            'type': 'select',
            'display': true,
            'disabled': true,
            'label': 'Provice',
            'key': 'Provice2',
            'options': [
                { label: 'Ontario', value: 'Ontario' },
                { label: 'Quebec', value: 'Quebec' },
                { label: 'British', value: 'British' },
            ],
            'position': {
                'row': '10',
                'column': '1',
            },
        }
    ]
}
