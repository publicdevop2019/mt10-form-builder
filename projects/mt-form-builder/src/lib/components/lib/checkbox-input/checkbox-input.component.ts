import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgLinker } from '../../../classes/ng-linker';
import { BaseService } from '../../../services/base.service';
import { EditorService } from '../../../services/editor.service';
import { takeLast, filter, take, takeWhile } from 'rxjs/operators';
@Component({
  selector: 'lib-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.css', '../form.css']
})
export class CheckboxInputComponent extends NgLinker implements OnDestroy, OnInit {
  public childFormGroup: FormGroup = new FormGroup({});
  private childFormSub: Subscription;
  constructor(editorServ: EditorService, baseServ: BaseService, public cdRef: ChangeDetectorRef) {
    super(editorServ, baseServ, cdRef);
  }
  ngOnInit() {
    super.ngOnInit();
    this.base.ctrl.valueChanges
      .pipe(filter(e => Array.isArray(e) || typeof e === 'boolean'))
      // .pipe(take(1))
      .subscribe((e) => {
        this.updateChildFormGroup();
      });
    this.updateChildFormGroup();
    this.childFormSub = this.childFormGroup.valueChanges.subscribe(() => {
      this.updateParentCtrl();
    });
  }
  ngOnDestroy() {
    super.ngOnDestroy();
    // this.childFormSub.unsubscribe();
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
    this.config.options.forEach(opt => {
      let nextValue: any;
      if (Array.isArray(this.base.ctrl.value)) {
        let typed = (this.fg.get(this.config.key).value as Array<string>);
        nextValue = typed.indexOf(opt) > -1;
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
      if (this.childFormGroup.get(opt)) {
        this.childFormGroup.get(opt).setValue(nextValue, noEmitEvent);
        if (this.config.disabled) {
          this.childFormGroup.get(opt).disable(noEmitEvent);
        } else {
          this.childFormGroup.get(opt).enable(noEmitEvent);
        }
      } else {
        this.childFormGroup.addControl(opt, new FormControl({ value: nextValue, disabled: this.config.disabled }));
      }
    });
  }
}
