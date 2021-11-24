import { IForm } from 'mt-form-builder/lib/classes/template.interface';

export const ADDRESS_FORM: IForm =
{
    "repeatable": false,
    "inputs": [
        {
            "type": "imageUpload",
            "display": true,
            "label": "Enter full name",
            "key": "fullname",
            "position": {
                "row": "0",
                "column": "0"
            },
        },
        {
            "type": "text",
            "display": true,
            "label": "Enter phone number",
            "key": "phonenumber",
            "position": {
                "row": "0",
                "column": "1"
            },
        },
        {
            "type": "text",
            "display": true,
            "label": "Enter street and number, P.O. box,c/o.",
            "key": "street&number",
            "position": {
                "row": "1",
                "column": "0"
            },
        },
        {
            "type": "text",
            "display": true,
            "label": "Apartment, suite, unit, building, floor, etc.",
            "key": "apt",
            "position": {
                "row": "1",
                "column": "1"
            },
        },
        {
            "type": "text",
            "display": true,
            "label": "Enter City",
            "key": "city",
            "position": {
                "row": "2",
                "column": "0"
            },
        },
        {
            "type": "text",
            "display": true,
            "label": "Enter Postal Code",
            "key": "postalCode",
            "position": {
                "row": "3",
                "column": "0"
            },
        },
        {
            "type": "select",
            "display": true,
            "label": "Country",
            "key": "country",
            options: [
                { label: 'Canada', value: 'Canada' }
            ],
            "position": {
                "row": "4",
                "column": "0"
            },
        },
        {
            "type": "select",
            "display": true,
            "label": "Province",
            "key": "province",
            "options": [
                { label: 'Ontario', value: 'Ontario' },
                { label: 'Quebec', value: 'Quebec' },
                { label: 'British', value: 'British' },
            ],
            "position": {
                "row": "4",
                "column": "1"
            },
        },
        {
            "type": "select",
            "display": true,
            multiple:true,
            "label": "Province",
            "key": "province",
            "options": [
                { label: 'Ontario', value: 'Ontario' },
                { label: 'Quebec', value: 'Quebec' },
                { label: 'British', value: 'British' },
            ],
            "position": {
                "row": "5",
                "column": "0"
            },
        }
    ]
}