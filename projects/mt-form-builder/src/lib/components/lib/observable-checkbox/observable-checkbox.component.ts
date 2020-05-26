import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgLinker } from '../../../classes/ng-linker';
import { IInputConfig, IOption } from '../../../classes/template.interface';
import { BaseService } from '../../../services/base.service';
import { EditorService } from '../../../services/editor.service';
import { FormInfoService } from '../../../services/form-info.service';

@Component({
  selector: 'lib-observable-checkbox',
  templateUrl: './observable-checkbox.component.html',
  styleUrls: ['./observable-checkbox.component.css', '../form.css']
})
/**
 * @note observable-checkbox, default value is [], to prevent unexpected value change boolean => [], which cause value change event
 */
export class ObservableCheckboxComponent extends NgLinker implements OnDestroy, OnInit {
  public childFormGroup: FormGroup = new FormGroup({});
  private childFormSub: Subscription;
  public observableOption: IOption[] = [];
  private observableConfig: IInputConfig;
  constructor(editorServ: EditorService, baseServ: BaseService, public cdRef: ChangeDetectorRef, private fis: FormInfoService) {
    super(editorServ, baseServ, cdRef);
  }
  ngOnInit() {
    super.ngOnInit();
    this.childFormSub = this.childFormGroup.valueChanges
      .subscribe(() => {
        this.updateParentCtrl();
      });
    this.fis.dynamicInputs[this.base.ctrlKey] = new Subject();
    this.fis.dynamicInputs[this.base.ctrlKey].subscribe(config => {
      this.observableConfig = config;
      this.updateChildFormGroup(config);
      this.observableOption = config.options;
    });
    // update child fg when parent value change
    this.base.ctrl.valueChanges
      .pipe(filter(e => (Array.isArray(e) || typeof e === 'boolean') && (this.observableConfig !== undefined && this.observableConfig !== null)))
      .subscribe((e) => {
        this.updateChildFormGroup(this.observableConfig);
      });
  }
  private updateChildFormGroup(config: IInputConfig) {
    let noEmitEvent = { emitEvent: false };
    config.options.forEach(opt => {
      let nextValue: any;
      if (Array.isArray(this.base.ctrl.value)) {
        let typed = (this.fg.get(this.config.key).value as Array<string>);
        nextValue = typed.indexOf(opt.value) > -1;
      }
      else if (typeof this.base.ctrl.value === 'boolean') {
        nextValue = this.base.ctrl.value;
      }
      else if (this.base.ctrl.value === null || this.base.ctrl.value === '') {
        nextValue = '';
      }
      else {
        console.error('!! Unknown type, should be one of [Array,boolean]' + this.base.ctrl.value + typeof this.base.ctrl.value)
      }
      if (this.childFormGroup.get(opt.value)) {
        this.childFormGroup.get(opt.value).setValue(nextValue, noEmitEvent);
        if (this.config.disabled) {
          this.childFormGroup.get(opt.value).disable(noEmitEvent);
        } else {
          this.childFormGroup.get(opt.value).enable(noEmitEvent);
        }
      } else {
        this.childFormGroup.addControl(opt.value, new FormControl({ value: nextValue, disabled: this.config.disabled }));
      }
    });
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    this.childFormSub.unsubscribe();
  }
  private updateParentCtrl() {
    const childKeys = Object.keys(this.childFormGroup.controls);
    const nextValue: string[] = childKeys.filter(e => this.childFormGroup.get(e).value);
    this.fg.get(this.config.key).setValue(nextValue);
  }
}
