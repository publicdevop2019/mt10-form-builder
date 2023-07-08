import { Input, Directive, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormInfoService } from '../services/form-info.service';
import { ICommonControl } from './template.interface';
@Directive()
export abstract class CommonComponent{
  get config() {
    return this.fis.forms[this.formId].inputs.filter(e => e.key === this.key)[0] as ICommonControl
  }
  get control() {
    return this.fis.formGroupCollection[this.formId].get(this.key)
  }
  @Input() formId: string;
  @Input() key: string;
  errorMatcher: ErrorStateMatcher;
  @HostBinding('style') get appClass() { return this.config.display ? 'display:block; flex:1; margin-right: 16px ' : ''; }
  constructor(
    public fis: FormInfoService
  ) {
    
  }
  bindError(): void {
    //NOTE must do at this lifecycle due to formId is undefined in constructor
    this.errorMatcher = new MyErrorStateMatcher(this.config)
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  private _config: ICommonControl;
  constructor(config: ICommonControl) {
    this._config = config;
  }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!this._config.errorMsg;
  }
}