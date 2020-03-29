import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditorService } from 'mt-form-builder';
import { ConsoleBtn, UserConsole } from '../../../clazz/user-console';
import { CONST } from '../../../constant/constant';
import { IMGList } from '../../../interfaze/commom.interface';
import { CreatorSvc } from '../../../service/creator.service';
import { HttpProxyService } from '../../../service/http-proxy.service';
@Component({
  selector: 'app-operation-console',
  templateUrl: './operation-console.component.html',
  styleUrls: ['./operation-console.component.css']
})
export class ConsoleComponent {
  public _f: FormGroup;
  // start console btn define
  public select_single: ConsoleBtn = new ConsoleBtn('select_single');
  public select_group: ConsoleBtn = new ConsoleBtn('select_group');
  public add_attribute: ConsoleBtn = new ConsoleBtn('add_attribute');
  public add_connection: ConsoleBtn = new ConsoleBtn('add_connection');
  public util_refresh: ConsoleBtn = new ConsoleBtn('util_refresh');
  public util_clear: ConsoleBtn = new ConsoleBtn('util_clear');
  public util_move: ConsoleBtn = new ConsoleBtn('util_move');
  public util_delete: ConsoleBtn = new ConsoleBtn('util_delete');
  // end of console btn define
  constructor(
    private _editorServ: EditorService,
    public creator: CreatorSvc,
    public http: HttpProxyService,
    private router: ActivatedRoute
  ) {
    this.creator.rightConsole = new UserConsole(CONST.RIGHT_PANEL_ID, [
      this.select_single, this.select_group, this.add_attribute,
      this.add_connection, this.util_clear, this.util_refresh, this.util_move, this.util_delete
    ], this.creator.systemFG);
    this._editorServ.editObjectKey$.subscribe(e => {
      if (this._checkSelectRule(e.ctrlName, e.isSingle)) {
        this._editorServ.confirmMark(e.ctrlName);
      } else {
        console.error('reject marking request');
      }
    });
    this._editorServ.deleteObjKey$.subscribe(key => {
      this.creator.delete([key]);
    });
    this._editorServ.unSelect$.subscribe(e => {
      this._removeFromGroup(e);
    });
  }
  private _removeFromGroup(ctrlName: string) {
    this.creator.selectedFields.splice(this.creator.selectedFields.findIndex(e => e === ctrlName), 1);
  }
  /**
   * @description only up to two single components can be selected!
   *
   */
  private _checkSelectRule(ctrlName: string, isSingle: boolean): boolean {
    if (isSingle && Object.keys(this.creator.selectedFields).length <= 1) {
      if (this.creator.selectedFields.findIndex(e => e === ctrlName) > -1) {
        // already added
      } else {
        this.creator.selectedFields.push(ctrlName);
      }
      return true;
    } else if (!isSingle) {
      this._removeFromGroup(ctrlName);
      return true;
    } else {
      return false;
    }
  }
  public createOrUpdate(): void {
    if (this.router.snapshot.paramMap.get('id')) {
      this.http.netImpl.updateResource(this.creator.getAll(), this.router.snapshot.paramMap.get('id'), this.creator.currentFormLastUpdateAt).subscribe()
    } else {
      this.http.netImpl.createResource(this.creator.getAll()).subscribe(next => {
        /** update keyChain */
        const newKeyChain = this.updateKeyChainPayload(next.location)
        /**
         *  sync keychain
         */
        this.http.netImpl.readResource(this.http.netImpl.keychain).subscribe(next => {
          this.http.netImpl.updateResource(newKeyChain, this.http.netImpl.keychain, next.lastUpdateAt).subscribe(next => {
            /**
             * keyChain update resp, only onSuccess then update stored payload
             */
            this.http.netImpl.keychainLastUpdateAt = next.lastUpdateAt;
            this.http.netImpl.keychainPayload = newKeyChain;
            /**
             * @todo onSuccess navigate
             */
          });
        })
      });
    }
  }
  private updateKeyChainPayload(newKey: string): IMGList[] {
    if (this.http.netImpl.keychainPayload === undefined) {
      /**
       * new keyChain
       */
      return [{ id: newKey, desc: 'todo' }]
    } else {
      /**
       * old keyChain
       */
      return [{ id: newKey, desc: 'todo' }]
    }
  }
}
