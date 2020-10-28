import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FactoryComponent } from './components/factory/factory.component';
import { CheckboxInputComponent } from './components/lib/checkbox-input/checkbox-input.component';
import { FileUploadComponent } from './components/lib/file-upload/file-upload.component';
import { RadioInputMultiComponent } from './components/lib/radio-input-multi/radio-input-multi.component';
import { SelectInputDynamicComponent } from './components/lib/select-input-dynamic/select-input-dynamic.component';
import { TextInputComponent } from './components/lib/text-input/text-input.component';
import { ImageUploadComponent } from './components/lib/image-upload/image-upload.component';
import { PaginatedSelectComponent } from './components/lib/paginated-select/paginated-select.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { VirtualScrollSelectComponent } from './components/lib/virtual-scroll-select/virtual-scroll-select.component'
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
    MatCardModule,
    MatProgressSpinnerModule,
    LayoutModule,
    ScrollingModule,
  ],
  declarations: [
    CheckboxInputComponent,
    RadioInputMultiComponent,
    SelectInputDynamicComponent,
    TextInputComponent,
    FactoryComponent,
    FileUploadComponent,
    ImageUploadComponent,
    PaginatedSelectComponent,
    VirtualScrollSelectComponent
  ],
  exports: [
    CheckboxInputComponent,
    RadioInputMultiComponent,
    SelectInputDynamicComponent,
    TextInputComponent,
    PaginatedSelectComponent,
    FactoryComponent
  ]
})
export class MtFormBuilderModule { }
