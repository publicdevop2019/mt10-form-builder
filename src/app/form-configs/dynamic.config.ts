import { IForm } from 'mt-form-builder/lib/classes/template.interface';

export const DYNAMIC_FORM: IForm = {
    "repeatable": true,
    "inputs": [
        {
            "type": "select",
            "display": true,
            "label": "SELECT_AN_ATTRIBUTE",
            "key": "attributeId",
            "position": {
                "row": "0",
                "column": "0"
            },
            "options": [
            ],
        },
        {
            "type": "select",
            "display": false,
            "label": "SELECT_AN_ATTRIBUTE_VALUE",
            "key": "attributeValueSelect",
            "position": {
                "row": "0",
                "column": "1"
            },
            "options": [
            ],
        },
        {
            "type": "text",
            "display": true,
            "label": "ENTER_AN_ATTRIBUTE_VALUE",
            "key": "attributeValueManual",
            "position": {
                "row": "0",
                "column": "1"
            },
        },
    ],
}