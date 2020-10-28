import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormInfoService, TextInputComponent, MtFormBuilderModule } from 'mt-form-builder';
import { AppComponent } from './app.component';
import { BtnComponent } from './component/btn/btn.component';
import { DownloadHelperComponent } from './component/download-helper/download-helper.component';
import { ModalComponent } from './component/modal/modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CreatorSvc } from './service/creator.service';
import { DeactivateGuard } from './service/deactivate.service';
import { ErrorInterceptor } from './service/error.interceptor';
import { HttpProxyService } from './service/http-proxy.service';
import { InitSvc } from './service/init.service';
import { ViewEditorComponent } from './view-editor/view-editor.component';
import { ConsoleComponent } from './workshop/user-panel/operation-console/operation-console.component';
import { UILibComponent } from './workshop/user-panel/ui-lib/ui-lib.component';
import { WorkshopComponent } from './workshop/workshop/workshop.component';
import { LayoutModule } from '@angular/cdk/layout';
import { WorkshopJsonComponent } from './pages/workshop-json/workshop-json.component';
@NgModule({
  declarations: [
    AppComponent,
    BtnComponent,
    ConsoleComponent,
    WorkshopComponent,
    DownloadHelperComponent,
    UILibComponent,
    ViewEditorComponent,
    DashboardComponent,
    NavBarComponent,
    ModalComponent,
    WorkshopJsonComponent
  ],
  entryComponents: [TextInputComponent, ModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MtFormBuilderModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    LayoutModule,
    RouterModule.forRoot([
      {
        path: 'home', component: NavBarComponent, canActivate: [InitSvc], canActivateChild: [InitSvc],
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'form-gui/:id', component: WorkshopComponent, canDeactivate: [DeactivateGuard] },
          { path: 'form-gui', component: WorkshopComponent, canDeactivate: [DeactivateGuard] },
          { path: 'form-json', component: WorkshopJsonComponent },
          { path: 'form-json/:id', component: WorkshopJsonComponent },
          { path: 'view-gui', component: ViewEditorComponent },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ],
      // { enableTracing: true }
    )],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    InitSvc,
    CreatorSvc,
    DeactivateGuard,
    FormInfoService,
    HttpProxyService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
