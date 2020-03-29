import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EditorService, FormInfoService } from 'magic-form';
import { ConnectionMgr } from '../clazz/connection.mgr';
import { HistoryMgr } from '../clazz/history.mgr';
import { TempWorker } from '../clazz/temp.worker';
import { UserConsole } from '../clazz/user-console';
import { getJsonByCtrlKey } from '../clazz/util';
import { IForm, IInputConfig, IPosition } from 'magic-form/lib/classes/template.interface';

@Injectable()
export class CreatorSvc {
  public currentFormLastUpdateAt:string;
  public selectedFields: string[] = []; // can have max of 2
  public historyMgr: HistoryMgr = new HistoryMgr();
  public leftConsole: UserConsole;
  public rightConsole: UserConsole;
  public viewEditorConsole: UserConsole;
  public systemFG: FormGroup = new FormGroup({}); // system fg used for logic
  public tempWorker: TempWorker;
  public connectionMgr: ConnectionMgr;
  public viewTemps: IForm;
  set temps(newForm: IForm) {
    Object.assign(this.historyMgr.current,newForm)
    this.historyMgr.add(newForm);
  }
  get temps(): IForm {
    return this.historyMgr.current;
  }
  constructor(
    private _editorServ: EditorService,
    private _fis: FormInfoService
  ) {
    this._editorServ.systemFG = this.systemFG;
    this.tempWorker = new TempWorker(this.historyMgr.current);
    this.connectionMgr = new ConnectionMgr(this.selectedFields, this.tempWorker);
  }
  public doCancle() {
    if (this.historyMgr.hasCancle()) {
      this.historyMgr.doCancle();
    } else {
      // no cancle allowed
    }
  }
  create(temp: IInputConfig) {
    this.temps.inputs.push(temp);
    this.historyMgr.saveCurrentToStack('create');
  }
  delete(ctrlNames: string[]) {
    this.temps.inputs = this.temps.inputs.filter(e => ctrlNames.indexOf(e.key) <= -1);
    this.historyMgr.saveCurrentToStack('delete');
  }
  /**DE0003
   * @description  Object.values is an experimental feature and it is not being supported in IE.
   */
  getAll(): IForm {
    return this.temps;
  }
  getCopy(): IForm {
    return JSON.parse(JSON.stringify(this.temps));
  }
  /**
   * fix for input() does not update view unless new object is passed
   */
  updateView(): void {
    this.viewTemps = this.getCopy();
  }
  get(ctrlName: string): IInputConfig {
    return getJsonByCtrlKey(this.temps, ctrlName);
  }
  public swapCoordinate(input1: string, input2: string) {
    let mediator: IPosition;
    mediator = this.get(input2).position;
    this.get(input2).position = this.get(input1).position;
    this.get(input1).position = mediator;
    this.historyMgr.saveCurrentToStack('swapCoordinate');
  }
  public updateCoordinate(input1: string, input2: IPosition) {
    this.get(input1).position = input2;
    this.historyMgr.saveCurrentToStack('updateCoordinate');
  }
  isEmpty(): boolean {
    return Object.keys(this.temps).length === 0;
  }
  getFormJSON(): string {
    return JSON.stringify(this.getAll());
  }
  /**
   * @description for temp creation usage only
   */
  public getNextRowSlot(): IPosition {
    const cor = <IPosition>{
      column: '0',
      row: String(this._fis.totalRowCollection['workshop'].length)
    };
    return cor;
  }
}
