import { Input, Directive, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormInfoService } from '../services/form-info.service';
import { ICommonControl } from './template.interface';
import { Utility } from '../services/utility';
@Directive()
export abstract class CommonComponent {
  get config() {
    return Utility.flatMap(this.fis.forms[this.formId].inputGrid).filter(e => e.key === this.key)[0] as ICommonControl
  }
  get control() {
    return this.fis.formGroups[this.formId].get(this.key)
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
    //NOTE cannot bind at constructor due to formId is undefined
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