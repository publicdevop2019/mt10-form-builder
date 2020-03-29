import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatOptionModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { FactoryComponent } from './components/factory/factory.component';
import { CheckboxInputComponent } from './components/lib/checkbox-input/checkbox-input.component';
import { FileUploadComponent } from './components/lib/file-upload/file-upload.component';
import { ObservableCheckboxComponent } from './components/lib/observable-checkbox/observable-checkbox.component';
import { RadioInputMultiComponent } from './components/lib/radio-input-multi/radio-input-multi.component';
import { SelectInputDynamicComponent } from './components/lib/select-input-dynamic/select-input-dynamic.component';
import { TextInputComponent } from './components/lib/text-input/text-input.component';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule,
  ],
  declarations: [
    CheckboxInputComponent,
    RadioInputMultiComponent,
    SelectInputDynamicComponent,
    TextInputComponent,
    FactoryComponent,
    ObservableCheckboxComponent,
    FileUploadComponent
  ],
  exports: [
    CheckboxInputComponent,
    RadioInputMultiComponent,
    SelectInputDynamicComponent,
    TextInputComponent,
    FactoryComponent
  ]
})
export class MagicFormModule { }
