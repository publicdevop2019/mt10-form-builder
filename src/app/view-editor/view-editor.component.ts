import { Component, OnDestroy } from '@angular/core';
import { EditorService, FormInfoService } from 'magic-form';
import { ConsoleBtn, UserConsole } from '../clazz/user-console';
import { CONST } from '../constant/constant';
import { CreatorSvc } from '../service/creator.service';
import { IPosition, IInputConfig } from 'magic-form/lib/classes/template.interface';
@Component({
  selector: 'app-view-editor',
  templateUrl: './view-editor.component.html',
  styleUrls: ['./view-editor.component.css']
})
export class ViewEditorComponent implements OnDestroy{
  // start console btn define
  public consoleBtn: ConsoleBtn = new ConsoleBtn('update_layout');
  private _dragingCtrlName: string;
  constructor(
    public creator: CreatorSvc,
    private _editorSvc: EditorService,
    private _fis: FormInfoService
  ) {
    this.creator.updateView();
    this.creator.viewEditorConsole = new UserConsole(CONST.RIGHT_PANEL_ID, [
      this.consoleBtn
    ], this.creator.systemFG);
    this._editorSvc.draging$.subscribe(elName => {
      this._dragingCtrlName = elName;
    });
    this._editorSvc.drop$.subscribe(dropEl => {
      if (dropEl.ctrlName === CONST.TEMP_PLACEHOLDER) {
        this.creator.updateCoordinate(this._dragingCtrlName, dropEl.coordinate);
      } else {
        this.creator.swapCoordinate(this._dragingCtrlName, dropEl.ctrlName);
      }
      /**
       * update slots
       */
      this._removeSlot();
      this._fis.refreshLayout(this.creator.getAll(),'workshop')
      this._addSlots()
      this.creator.updateView();
      setTimeout(() => { this.creator.viewEditorConsole.setStatus(this.consoleBtn, true); }, CONST.DEFAULT_TIMEOUT);
    });
  }
  public createTempPlaceholder() {
    this._addSlots();
    this.creator.updateView();
    setTimeout(() => { this.creator.viewEditorConsole.setStatus(this.consoleBtn, this.consoleBtn.nextState); }, CONST.DEFAULT_TIMEOUT);
  }
  private _addSlots() {
    const layout = this._fis.layoutCollection['workshop'];
    Object.keys(layout).forEach(row => {
      if (layout[row].length === 3) {
        // no space availiable
      } else {
        // add slot as placeholder
        this._getSlotXCoordinate(layout[row]).forEach(x => {
          const rightsideCoordinate: IPosition = layout[row][layout[row].length - 1].position;
          const tempPlaceholder = <IInputConfig>{
            type: 'tempPlaceholder',
            key: CONST.TEMP_PLACEHOLDER,
            position: {
              column: x.toString(),
              row: rightsideCoordinate.row
            }
          };
          this.creator.getAll().inputs.push(tempPlaceholder);
        });
      }
    });
  }
  private _getSlotXCoordinate(rowConfigs: IInputConfig[]): number[] {
    const xs: number[] = [0, 1, 2];
    const currentXs = rowConfigs.map(el => {
      return +(el.position.column);
    });
    return this._findMissingElements(currentXs, xs);
  }
  private _findMissingElements(compare: number[], to: number[]): number[] {
    return to.filter(el => compare.indexOf(el) === -1);
  }
  public layoutOpt() {
    this.consoleBtn.status ?
      this._cancelLayoutMode()
      : this.createTempPlaceholder();
  }
  private _cancelLayoutMode() {
    this.creator.viewEditorConsole.setStatus(this.consoleBtn, this.consoleBtn.nextState);
    this._removeSlot();
    this.creator.updateView();
  }
  private _removeSlot() {
    let iteration: number = this.creator.getAll().inputs.filter(e => e.type === 'tempPlaceholder').length;
    while (iteration > 0) {
      const index: number = this.creator.getAll().inputs.findIndex(e => e.type === 'tempPlaceholder');
      this.creator.getAll().inputs.splice(index, 1);
      iteration--;
    }
    this.creator.updateView();
  }
  ngOnDestroy(): void {
    this._removeSlot()
  }
}
