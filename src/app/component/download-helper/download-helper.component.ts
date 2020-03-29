import { Component, OnInit } from '@angular/core';
import { CreatorSvc } from '../../service/creator.service';
@Component({
  selector: 'app-download-helper',
  templateUrl: './download-helper.component.html'
})
export class DownloadHelperComponent implements OnInit {
  private _fileName = 'config.json';
  constructor(
    private _c: CreatorSvc
  ) { }
  ngOnInit() {
  }
  // TODO test Fn in IE
  doExport() {
      if (this._c.isEmpty()) {
        window.alert('can not export empty data!');
      } else {
        const a = document.createElement('a');
        const blob = new Blob([this._c.getFormJSON()], {'type': 'application/json'});
        a.href = window.URL.createObjectURL(blob);
        a.download = this._fileName;
        a.click();
      }
  }
}
