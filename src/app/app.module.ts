import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MtFormBuilderModule } from 'mt-form-builder';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { WorkshopJsonComponent } from './workshop-json/workshop-json.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavBarComponent,
    WorkshopJsonComponent
  ],
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
        path: 'home', component: NavBarComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'form-json', component: WorkshopJsonComponent },
          { path: 'form-json/:id', component: WorkshopJsonComponent },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ],
    )],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
