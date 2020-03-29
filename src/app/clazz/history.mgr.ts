
/**
 * @description manager user history e.g undo
 *
 */
export class HistoryMgr {
  private _tempsStack: {}[] = []; // max 5
  private _stackSize = 5;
  private _stackIndex = 0;
  public current: any = { 'repeatable': false, 'inputs': [] };
  public add(input: any) {
    this._tempsStack.push(JSON.parse(JSON.stringify(input)));
    this.stackCleanUp();
  }
  // push current temp to stack
  public saveCurrentToStack(context: string) {
    if (this._stackIndex !== this._tempsStack.length - 1) {
      this._tempsStack.splice(this._stackIndex + 1);
    } else {
      // do nothing
    }
    this._tempsStack.push(JSON.parse(JSON.stringify(this.current)));
    this.stackCleanUp();
    this._stackIndex = this._tempsStack.length - 1;
  }
  // must doCancel first then doRedo
  public doCancle() {
    if (this.hasCancle()) {
      this._stackIndex--;
      this.current = JSON.parse(JSON.stringify(this._tempsStack[this._stackIndex]));
    } else {
      // no cancle allowed
    }
  }
  public hasCancle(): boolean {
    return this._tempsStack.length > 1 && this._stackIndex > 0;
  }
  /**
   * @description stack size set to 5
   *
   * @memberof CreatorService
   */
  public stackCleanUp() {
    if (this._tempsStack.length > this._stackSize) {
      // remove first element
      this._tempsStack.splice(0, 1);
    } else {
      // do nothing
    }
  }
}
