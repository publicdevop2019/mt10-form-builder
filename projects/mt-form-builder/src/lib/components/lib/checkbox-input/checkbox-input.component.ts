import { ChangeDetectorRef, Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgLinker } from '../../../classes/ng-linker';
import { FormInfoService } from '../../../services/form-info.service';
@Component({
  selector: 'lib-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.css', '../form.css']
})
export class CheckboxInputComponent extends NgLinker implements OnDestroy, OnInit {
  public childFormGroup: FormGroup = new FormGroup({});
  private childFormChangeSub: Subscription;
  constructor(public cdRef: ChangeDetectorRef,public formInfoSvc:FormInfoService) {
    super(cdRef);
  }
  ngOnInit() {
    super.ngOnInit();
    this.base.ctrl.valueChanges
      .pipe(filter(e => Array.isArray(e) || typeof e === 'boolean'))
      .subscribe(() => {
        this.updateChildFormGroup();
      });
    this.updateChildFormGroup();
  }
  ngOnDestroy() {
    if (this.childFormChangeSub)
      this.childFormChangeSub.unsubscribe();
    super.ngOnDestroy();
  }
  updateParentCtrl() {
    const childKeys = Object.keys(this.childFormGroup.controls);
    if (childKeys.length === 1) {
      this.fg.get(this.config.key).setValue(this.childFormGroup.get(childKeys[0]).value);
    } else {
      const nextValue: string[] = childKeys.filter(e => this.childFormGroup.get(e).value);
      this.fg.get(this.config.key).setValue(nextValue);
    }
  }
  updateChildFormGroup() {
    let noEmitEvent = { emitEvent: false };
    this.config.options.forEach((opt, index) => {
      let nextValue: any;
      if (Array.isArray(this.base.ctrl.value)) {
        let typed = (this.fg.get(this.config.key).value as Array<string>);
        nextValue = typed.indexOf(opt.value as string) > -1;
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
      if (this.childFormGroup.get(opt.value as string)) {
        this.childFormGroup.get(opt.value as string).setValue(nextValue, noEmitEvent);
        if (this.config.disabled) {
          this.childFormGroup.get(opt.value as string).disable(noEmitEvent);
        } else {
          this.childFormGroup.get(opt.value as string).enable(noEmitEvent);
        }
      } else {
        // wait untill all controls addedd then update parent control value
        // otherwise parent control will have incorrect number of childKeys
        if (index === 0 && this.childFormChangeSub)
          this.childFormChangeSub.unsubscribe();
        this.childFormGroup.addControl(opt.value as string, new FormControl({ value: nextValue, disabled: this.config.disabled }));
        if (index === this.config.options.length - 1)
          this.childFormChangeSub = this.childFormGroup.valueChanges.subscribe(() => {
            this.updateParentCtrl();
          });
      }
    });
  }
}
