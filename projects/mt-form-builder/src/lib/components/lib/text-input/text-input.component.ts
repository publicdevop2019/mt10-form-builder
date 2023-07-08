import { Component, OnInit } from '@angular/core';
import { ITextControl } from '../../../classes/template.interface';
import { CommonComponent } from '../../../classes/common.component';
import { FormInfoService } from '../../../services/form-info.service';
@Component({
  selector: 'lib-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css', '../form.css']
})
export class TextInputComponent extends CommonComponent implements OnInit{
  constructor(
    public fis: FormInfoService
  ) {
    super(fis);
  }
  ngOnInit(): void {
    this.bindError()
  }
  get config(): ITextControl {
    return super.config as ITextControl
  }
}

