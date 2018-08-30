import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './service/data.service';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, 
  MatListModule, MatCheckboxModule, MatGridListModule, 
  MatCardModule, MatTableModule, MatFormFieldModule,
  MatInputModule, MatProgressSpinnerModule, MatTabsModule, 
  MatOptionModule, MatSelectModule, MatChipsModule, MatSlideToggleModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    ListDetailComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
    ,MatToolbarModule, MatButtonModule, MatSidenavModule
    ,MatIconModule, MatListModule, MatCheckboxModule, MatGridListModule
    ,MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule
    ,MatProgressSpinnerModule, MatTabsModule, MatOptionModule
    ,MatSelectModule, MatChipsModule, MatSlideToggleModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
