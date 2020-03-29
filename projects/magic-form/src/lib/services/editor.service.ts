import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { IPosition } from '../classes/template.interface';
@Injectable({
  providedIn: 'root'
})
export class EditorService {
  private _editObjectKey: Subject<{ctrlName: string; isSingle: boolean}> = new Subject();
  public readonly editObjectKey$: Observable<{ctrlName: string; isSingle: boolean}> = this._editObjectKey.asObservable();
  private _deleteObjKey: Subject<string> = new Subject();
  public readonly deleteObjKey$: Observable<string> = this._deleteObjKey.asObservable();
  private _unSelect: Subject<string> = new Subject();
  public readonly unSelect$: Observable<string> = this._unSelect.asObservable();
  private _confirmMark: Subject<string> = new Subject();
  public readonly confirmMark$: Observable<string> = this._confirmMark.asObservable();
  public systemFG: FormGroup;
  /**
   * there can only be one dragover element, event should only be emit once
   */
  private _previousCoordinate: IPosition;
  public drop: Subject<{ctrlName: string, coordinate: IPosition}> = new Subject();
  public readonly drop$: Observable<{ctrlName: string, coordinate: IPosition}> = this.drop.asObservable();
  public draging: Subject<string> = new Subject();
  public readonly draging$: Observable<string> = this.draging.asObservable();
  confirmMark(replyCtrlKey: string) {
    this._confirmMark.next(replyCtrlKey);
  }
  requestMarking(ctrlName: string, isSingle: boolean) {
    this._editObjectKey.next({ctrlName, isSingle});
  }
  requestDelete(ctrlName: string) {
    this._deleteObjKey.next(ctrlName);
  }
  notifyUnselect(ctrlName: string) {
    this._unSelect.next(ctrlName);
  }
  notifyDrop(ctrlName: string, coordinate: IPosition) {
    this.drop.next({ctrlName, coordinate});
  }
  notifyDraging(ctrlName: string) {
      this.draging.next(ctrlName);
  }
  private _equals(compare: IPosition, to: IPosition): boolean {
    return compare.column === to.column && compare.row === to.row;
  }
}
