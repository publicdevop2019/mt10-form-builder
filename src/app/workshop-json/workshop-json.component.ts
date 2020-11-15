import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IForm } from 'mt-form-builder/lib/classes/template.interface';
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { USER_CREATION } from '../form-configs/user-create.config';
import { DYNAMIC_FORM } from '../form-configs/dynamic.config';
import { ADDRESS_FORM } from '../form-configs/address.config';
import { NESTED_FORM } from '../form-configs/nested.config';
import { PRODUCT_OPTION_FORM } from '../form-configs/product-option.config';
import { FormInfoService } from 'mt-form-builder';
@Component({
  selector: 'app-workshop-json',
  templateUrl: './workshop-json.component.html',
  styleUrls: ['./workshop-json.component.css']
})
export class WorkshopJsonComponent implements OnInit {
  get raw() {
    return JSON.stringify(this.formInfo, null, 2)
  }
  @ViewChild('editor', { static: true }) editor: any;
  public formId: string = 'root';
  public formInfo: IForm;
  constructor(
    private router: ActivatedRoute,
    private chagneRef: ChangeDetectorRef,
    private fis:FormInfoService
  ) {
    if (this.router.snapshot.paramMap.get('id')) {
      this.formInfo = JSON.parse(JSON.stringify(this.loadFormInfo(this.router.snapshot.paramMap.get('id'))))
    } else {
      /**
       * start from scrach
       */
    }
    this.formId = this.router.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.chagneRef.detectChanges();
    fromEvent<KeyboardEvent>(this.editor.nativeElement, 'keyup').pipe(filter(e => ![37, 38, 39, 40].includes(e.keyCode))).pipe(debounceTime(1000)).subscribe(() => {
      try {
        this.formInfo = JSON.parse((this.editor.nativeElement as HTMLTextAreaElement).value);
        this.fis.formGroupCollection_formInfo[this.formId]=JSON.parse((this.editor.nativeElement as HTMLTextAreaElement).value);//required
      } catch (e) {
        console.error(e)
      }
    });
  }
  loadFormInfo(id: string): IForm {
    if (id === 'DYNAMIC_FORM')
      return DYNAMIC_FORM
    if (id === 'USER_CREATION')
      return USER_CREATION
    if (id === 'ADDRESS_FORM')
      return ADDRESS_FORM
    if (id === 'NESTED_FORM')
      return NESTED_FORM
    if (id === 'PRODUCT_OPTION_FORM')
      return PRODUCT_OPTION_FORM
  }

}
export const DASH_BOARD=[
  {
    id: 'ADDRESS_FORM',
  },
  {
    id: 'USER_CREATION',
  },
  {
    id: 'NESTED_FORM',
  },
  {
    id: 'PRODUCT_OPTION_FORM',
  },
  {
    id: 'DYNAMIC_FORM',
  }
]