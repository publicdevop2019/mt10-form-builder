import { ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { MG_CONST } from '../constants';
import { IInputConfig } from './template.interface';
/**
 * @description base class used for all temps
 *
 */
export class Base{
  public fg: FormGroup;
  public config: IInputConfig;
  appClass: string = MG_CONST.DEFAULT_CLASS_SET;
  public ctrl: AbstractControl;
  public ctrlKey: string;
  public matcher: ErrorStateMatcher;
  constructor(
    public cdRef: ChangeDetectorRef
  ) {

  }
  public onChanges(changes: SimpleChanges): void {
    if (changes['config']) {
      this.config = changes['config'].currentValue;
      this.matcher = new MyErrorStateMatcher(this.config);
    }
    if (changes['fg'])
      this.fg = changes['fg'].currentValue;
    this.ctrlKey = this.config.key;
    if (this.fg)
      this.ctrl = this.fg.get(this.ctrlKey)
  }
  public onInit() {
  }

  public onDestroy() {
  }
  /**
   * @defect realTime validation will cause <<ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked>>
   * this will result un-expected behavior
   */
  public afterViewChecked() {
    this.cdRef.detectChanges();
  }
}
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  private _config: IInputConfig;
  constructor(config: IInputConfig) {
    this._config = config;
  }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!this._config.errorMsg;
  }
}