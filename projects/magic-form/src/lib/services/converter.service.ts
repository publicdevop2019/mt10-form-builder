import { Injectable } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { FormInfoService } from './form-info.service';
import { IInputConfig } from '../classes/template.interface';
@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  constructor(private _fis: FormInfoService) { }
  public getFormGroup(formId: string, inputConfigs?: IInputConfig[]): FormGroup {
    if (this._alreadyRegistered(formId)) {
      this.updateExisting(formId, inputConfigs)
    } else {
      this.createNew(formId, inputConfigs)
    }
    return this._fis.formGroupCollection[formId];
  }
  private _alreadyRegistered(formId: string) {
    return Object.keys(this._fis.formGroupCollection).indexOf(formId) > -1
  }
  private createNew(formId: string, configs: IInputConfig[]): void {
    const fg = new FormGroup({});
    this._fis.formGroupCollection[formId] = fg;
    configs.forEach(config => {
      let ctrl: AbstractControl;
      if (['observable-checkbox'].indexOf(config.type) > -1) {
        ctrl = new FormControl({ value: [], disabled: config.disabled });
      } else {
        ctrl = new FormControl({ value: '', disabled: config.disabled });
      }
      this._fis.formGroupCollection[formId].addControl(config.key, ctrl);
    });

  }
  private updateExisting(formId: string, configs: IInputConfig[]) {
    configs.forEach(config => {
      if (this._fis.formGroupCollection[formId].get(config.key)) {
        if (config.disabled)
          this._fis.formGroupCollection[formId].get(config.key).disable();
      } else {
        // new control
        let ctrl: AbstractControl;
        if (['observable-checkbox'].indexOf(config.type) > -1) {
          ctrl = new FormControl({ value: [], disabled: config.disabled });
        } else {
          ctrl = new FormControl({ value: '', disabled: config.disabled });
        }
        this._fis.formGroupCollection[formId].addControl(config.key, ctrl);
      }
    });
    const keys = configs.map(e => e.key);
    Object.keys(this._fis.formGroupCollection[formId].controls)
      .filter(e => !(keys.indexOf(e) > -1))
      .forEach(e => this._fis.formGroupCollection[formId].removeControl(e))
  }
  public package(formId: string): string {
    return this._fis.formGroupCollection[formId].value;
  }
}
