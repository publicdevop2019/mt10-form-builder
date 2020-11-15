import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { IForm, IInputConfig } from '../../classes/template.interface';
import { FormInfoService } from '../../services/form-info.service';
import { FactoryComponent } from './factory.component';
@Component({ selector: 'lib-text-input', template: '' })
class TextInputComponent {
    @Input() fg: FormGroup;
    @Input() config: IInputConfig;
    @Input() formId: string;
}
@Component({ selector: 'lib-select-input-dynamic', template: '' })
class SelectInputComponent {
    @Input() fg: FormGroup;
    @Input() config: IInputConfig;
    @Input() formId: string;
}
@Component({ selector: 'lib-radio-input-multi', template: '' })
class RadioInputComponent {
    @Input() fg: FormGroup;
    @Input() config: IInputConfig;
    @Input() formId: string;
}
@Component({ selector: 'lib-checkbox-input', template: '' })
class CheckboxInputComponent {
    @Input() fg: FormGroup;
    @Input() config: IInputConfig;
    @Input() formId: string;
}
@Component({ selector: 'lib-file-upload', template: '' })
class FuploadInputComponent {
    @Input() fg: FormGroup;
    @Input() config: IInputConfig;
    @Input() formId: string;
}
@Component({ selector: 'lib-image-upload', template: '' })
class ImageInputComponent {
    @Input() fg: FormGroup;
    @Input() config: IInputConfig;
    @Input() formId: string;
}
@Component({ selector: 'lib-paginated-select', template: '' })
class PaginatedSelectInputComponent {
    @Input() fg: FormGroup;
    @Input() config: IInputConfig;
    @Input() formId: string;
}
@Component({ selector: 'lib-virtual-scroll-select', template: '' })
class VirtualInputComponent {
    @Input() fg: FormGroup;
    @Input() config: IInputConfig;
    @Input() formId: string;
}
@Component({ selector: 'lib-date-picker', template: '' })
class DatepickerInputComponent {
    @Input() fg: FormGroup;
    @Input() config: IInputConfig;
    @Input() formId: string;
}
@Component({ selector: 'mat-icon', template: '' })
class MatIconComponent {
}
const TEST_INPUT: IInputConfig =
{
    "type": "text",
    "display": true,
    "label": "Enter phone number",
    "key": "phonenumber",
    "position": {
        "row": "0",
        "column": "1"
    },
}
const SELECT_INPUT: IInputConfig =
{
    "type": "select",
    "display": true,
    "label": "Select phone number",
    "key": "phonenumber2",
    "position": {
        "row": "0",
        "column": "1"
    },
}
const NESTED_TEST_FORM: IForm =
{
    "repeatable": true,
    "inputs": [
        TEST_INPUT,
    ]
}
const TEST_INPUT_FORM: IInputConfig =
{
    "type": "form",
    "display": true,
    "label": "Enter phone number",
    "key": "inputForm",
    "form": NESTED_TEST_FORM,
    "position": {
        "row": "1",
        "column": "0"
    },
}
const TEST_FORM: IForm =
{
    "repeatable": true,
    "inputs": [
        TEST_INPUT,
        SELECT_INPUT,
        TEST_INPUT_FORM
    ]
}

@Component({
    template: `
    <lib-factory
      [formId]="formId" [formInfo]="formInfo">
    </lib-factory>`
})
class TestHostComponent {
    public formId: string = 'dummy';
    public formInfo: IForm = TEST_FORM;
}
describe('FactoryComponent when inside a test host', () => {
    let comp: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let formBody: DebugElement;
    let el: DebugElement;
    let mockFg: FormGroup = new FormGroup({ 'phonenumber': new FormControl('') })
    const hostFisSpy = jasmine.createSpyObj('FormInfoService', ['add', 'update']);
    hostFisSpy.add.and.returnValue();
    hostFisSpy.update.and.returnValue(mockFg);
    hostFisSpy['$refresh'] = new Subject<void>();
    hostFisSpy['totalRowGroupedRowCollection'] = {};
    hostFisSpy['totalRowGroupedRowCollection']['dummy'] = ['0']
    hostFisSpy['totalRowGroupedRowCollection']['inputForm'] = ['0']
    hostFisSpy['totalRowGroupedRowCollectionIndex'] = {};
    hostFisSpy['totalRowGroupedRowCollectionIndex']['dummy'] = { 0: ['0']}
    hostFisSpy['totalRowGroupedRowCollectionIndex']['inputForm'] = { 0: ['0']}
    hostFisSpy['layoutCollection'] = {};
    hostFisSpy['layoutCollection']['dummy'] = { 0: [TEST_INPUT, SELECT_INPUT,TEST_INPUT_FORM] }
    hostFisSpy['layoutCollection']['inputForm'] = { 0: [TEST_INPUT] }
    hostFisSpy['formGroupCollection_index'] = {};
    hostFisSpy['formGroupCollection_template'] = {};
    hostFisSpy['formGroupCollection_formInfo'] = {};
    hostFisSpy['$eventPub'] = new Subject<void>();
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                TestHostComponent,
                FactoryComponent,
                TextInputComponent,
                SelectInputComponent,
                RadioInputComponent,
                CheckboxInputComponent,
                FuploadInputComponent,
                ImageInputComponent,
                PaginatedSelectInputComponent,
                VirtualInputComponent,
                DatepickerInputComponent,
                MatIconComponent
            ],
            providers: [
                { provide: FormInfoService, useValue: hostFisSpy }
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(TestHostComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();// trigger initial data binding
    });

    it('should create correct inputs', () => {
        formBody = fixture.debugElement.query(e => e.properties['id'] === 'dummy_mt_form_builder_body')
        expect(formBody.query(e => e.name === 'lib-text-input').nativeElement).toBeTruthy()
        expect(formBody.query(e => e.name === 'lib-select-input-dynamic').nativeElement).toBeTruthy()
        expect(formBody.query(e => e.name === 'lib-factory').nativeElement).toBeTruthy()
    });
    it('should create correct nested input', () => {
        let formBody2= fixture.debugElement.query(e => e.properties['id'] === 'inputForm_mt_form_builder_body')
        expect(formBody2.query(e => e.name === 'lib-text-input').nativeElement).toBeTruthy()
    });
    it('should raise add event with correct formId', () => {
        let formBtn0 = fixture.debugElement.queryAll(e => e.properties['id'] === 'dummy_mt_form_builder_add_btn')[0]
        formBtn0.triggerEventHandler('click', null);
        let fis = fixture.debugElement.injector.get(FormInfoService);
        const spy = fis.add as jasmine.Spy;
        expect(spy.calls.any()).toBe(true, "add called");
        const navArgs = spy.calls.first().args[0];
        expect(navArgs).toBe('dummy');
    });
});
