import { Component } from '@angular/core';
import { EditorService } from 'magic-form';
import { ConsoleBtn, UserConsole } from '../../../clazz/user-console';
import { CONST } from '../../../constant/constant';
import { CreatorSvc } from '../../../service/creator.service';
@Component({
  selector: 'app-ui-lib',
  templateUrl: './ui-lib.component.html',
  styleUrls: ['./ui-lib.component.css']
})
export class UILibComponent {
  // start console btn define
  public textWizard: ConsoleBtn = new ConsoleBtn('textWizard');
  public radioWizard: ConsoleBtn = new ConsoleBtn('radioWizard');
  public checkboxWizard: ConsoleBtn = new ConsoleBtn('checkboxWizard');
  public selectWizard: ConsoleBtn = new ConsoleBtn('selectWizard');
  public sigWizard: ConsoleBtn = new ConsoleBtn('sigWizard');
  public formatedWizard: ConsoleBtn = new ConsoleBtn('formatedWizard');
  public staticDisplayWizard: ConsoleBtn = new ConsoleBtn('staticDisplayWizard');
  public dynamicWizard: ConsoleBtn = new ConsoleBtn('DynamicWizard');
  // end of console btn define
  constructor(
    private _editor: EditorService,
    public creator: CreatorSvc
  ) {
    // register btn
    this.creator.leftConsole = new UserConsole(CONST.LEFT_PANEL_ID, [
      this.textWizard, this.radioWizard, this.checkboxWizard, this.selectWizard,
      this.sigWizard, this.formatedWizard, this.staticDisplayWizard
    ], this.creator.systemFG);
  }
}
