import { ITokenResponse, IMGList } from '../interfaze/commom.interface';
import { IForm } from 'mt-form-builder/lib/classes/template.interface';
export const MOCK_CONST = {
  ADDRESS_FORM: <IForm>
    {
      "repeatable": false,
      "inputs": [
        {
          "type": "text",
          "display": true,
          "label": "Enter full name",
          "key": "fullname",
          "position": {
            "row": "0",
            "column": "0"
          },
          attributes: [
            {
              type: 'required',
              errorMsg: 'field cannot be empty'
            }
          ]
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
          "attributes": [
            {
              type: 'required',
              errorMsg: 'field cannot be empty'
            },
            {
              type: 'numberOnly',
              errorMsg: 'only numbers are allowed here'
            },
            {
              type: 'min10',
              errorMsg: 'min length required'
            },
            {
              type: 'max20',
              errorMsg: 'max length exceed'
            }
          ]
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
          "attributes": [
            {
              type: 'required',
              errorMsg: 'field cannot be empty'
            },
          ]
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
          "attributes": [
            {
              type: 'required',
              errorMsg: 'field cannot be empty'
            },
          ]
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
          "attributes": [
            {
              type: 'required',
              errorMsg: 'field cannot be empty'
            },
          ]
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
          "attributes": [
            {
              type: 'required',
              errorMsg: 'field cannot be empty'
            },
            {
              type: 'fix6',
              errorMsg: 'field length should be 6'
            },
          ]
        },
        {
          "type": "select",
          "display": true,
          "label": "Country",
          "key": "country",
          "options": [
            "Canada"
          ],
          "position": {
            "row": "4",
            "column": "0"
          },
          "attributes": [
            {
              type: 'required',
              errorMsg: 'field cannot be empty'
            },
          ]
        },
        {
          "type": "select",
          "display": true,
          "label": "Province",
          "key": "province",
          "options": [
            "Ontario",
            "Quebec",
            "British",
            "Alberta",
            "Manitoba",
            "Saskatchewan",
            "Nova Scotia",
            "New Brunswick",
            "Newfoundland and Labrador",
            "Prince Edward Island",
            "Northwest Territories",
            "Nunavut",
            "Yukon",
          ],
          "position": {
            "row": "4",
            "column": "1"
          },
          "attributes": [
            {
              type: 'required',
              errorMsg: 'field cannot be empty'
            },
          ]
        }
      ]
    }
  ,
  USER_CREATION: <IForm>{
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
        attributes: [
          {
            type: 'required',
            errorMsg: 'field cannot be empty'
          },
          {
            type: 'numberOnly',
            errorMsg: 'only numbers are allowed here'
          },
          {
            type: 'min8',
            errorMsg: 'min length required'
          },
          {
            type: 'max15',
            errorMsg: 'max length exceed'
          }
        ]
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
          'Male',
          'Female'
        ],
        'position': {
          'row': '3',
          'column': '0',
        },
        attributes: [
          {
            type: 'required',
            errorMsg: 'field cannot be empty'
          },
        ]
      },
      {
        'type': 'radio',
        'label': 'Gender2',
        'display': true,
        'key': 'Gender2',
        'disabled': true,
        'options': [
          'Male',
          'Female'
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
          'Male',
          'Female'
        ],
        "direction": 'row',
        'position': {
          'row': '5',
          'column': '0',
        },
        attributes: [
          {
            type: 'required',
            errorMsg: 'field cannot be empty'
          },
        ]
      },
      {
        'type': 'checkbox',
        'display': true,
        'label': 'What type of car do you own?',
        'key': 'What type of car do you own?',
        'options': [
          'Hyundai',
          'Honda',
          'Audi',
          'BMW'
        ],
        'position': {
          'row': '6',
          'column': '0',
        },
        attributes: [
          {
            type: 'required',
            errorMsg: 'field cannot be empty'
          },
        ]
      },
      {
        'type': 'checkbox',
        'display': true,
        'label': 'What type of car do you own?',
        'key': 'What type of car do you own?3',
        'options': [
          'Hyundai',
          'Honda',
          'Audi',
          'BMW'
        ],
        "direction": 'row',
        'position': {
          'row': '7',
          'column': '0',
        },
        attributes: [
          {
            type: 'required',
            errorMsg: 'field cannot be empty'
          },
        ]
      },
      {
        'type': 'checkbox',
        'display': true,
        'label': 'What type of car do you own?',
        'key': 'What type of car do you own?2',
        'disabled': true,
        'options': [
          'Hyundai',
          'Honda',
          'Audi',
          'BMW'
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
          'Ontario',
          'Quebec',
          'British Columbia'
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
          'Ontario',
          'Quebec',
          'British Columbia'
        ],
        'position': {
          'row': '10',
          'column': '1',
        },
      }
    ]
  },
  MOCK_USER: <ITokenResponse>{
    access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiZWRnZS1wcm94eSIsIm9hdXRoMi1pZCIsImxpZ2h0LXN0b3JlIl0sInVzZXJfbmFtZSI6IjAiLCJzY29wZSI6WyJ0cnVzdCIsInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1NjkyOTI5ODAsImlhdCI6MTU2OTI5Mjg2MCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9ST09UIiwiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJqdGkiOiJkMzU5M2VmZS0wYzA4LTQ1YzYtYjI1Ni1iNjlkM2M0Yzc5OTgiLCJjbGllbnRfaWQiOiJsb2dpbi1pZCJ9.JZl_IkgAaWu1a6XW1V9AlW0HHN7qkmfbVdR9paCaNxn1dbL1F3VLf2YxLORQTBIymSG_u1CUWKlvqIF3ieaM6FhCh4UVztxP0QZh1Vq8b28TqE4CSeTF-v4vH7PxUkJETQzUmFwv8I2aZngQ3MI1sR8wAkkkJFpRGj6PEmh4rl5Vf5hU-MeLE6yXW2HK_otC7UMDX0mDGRTKlpUE6O86SnQvjGdDXYr5HU4gSL9AAcmob8ZDdHcS5ECSv9e3bxBzJKpcbqn2vAKYJhtg2ltviOXIohC8d4G5TerAfc8QxGXe-dG_yny3Zf1RP0Uoh3tbsWhQ4b6CHbqpkoMMTK6xsA'
  },
  FORM_LIST: <IMGList[]>[
    {
      id: 'ADDRESS_FORM',
      desc: 'Simple address form'
    },
    {
      id: 'USER_CREATION',
      desc: 'Form with all kinds of input type'
    },
    {
      id: 'NESTED_FORM',
      desc: 'Nested form'
    },
    {
      id: 'PRODUCT_OPTION_FORM',
      desc: 'Object market product form'
    }
  ],
  NESTED_FORM: <IForm>{
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
        'key': 'title',
        'position': {
          'row': '1',
          'column': '0',
        },
      },
      {
        'type': 'form',
        'display': true,
        'label': '',
        'key': 'childProductForm',
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
              'key': 'customerReviewForm',
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
                    'key': 'customerName',
                    'position': {
                      'row': '0',
                      'column': '0',
                    },
                  },
                  {
                    'type': 'text',
                    'display': true,
                    'label': 'Review',
                    'key': 'customerReview',
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
        'key': 'childStorageForm',
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
  },
  PRODUCT_OPTION_FORM: <IForm>{
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
      // {
      //   'type': 'form',
      //   'display': true,
      //   'label': '',
      //   'key': 'optionDetailForm',
      //   'position': {
      //     'row': '2',
      //     'column': '0',
      //   },
      //   form: {
      //     'repeatable': true,
      //     inputs: [
      //       {
      //         'type': 'text',
      //         'display': true,
      //         'label': 'Enter value',
      //         'key': 'optionValue',
      //         'position': {
      //           'row': '0',
      //           'column': '0',
      //         },
      //       },
      //       {
      //         'type': 'text',
      //         'display': true,
      //         'label': 'Enter price change',
      //         'key': 'optionPrice',
      //         'position': {
      //           'row': '0',
      //           'column': '0',
      //         },
      //       },
      //     ],
      //   },
      // },
    ]
  },
};
