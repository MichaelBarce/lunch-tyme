import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './service/data.service';
import { RouterModule, CanActivate } from '@angular/router';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, 
  MatListModule, MatCheckboxModule, MatGridListModule,
  MatCardModule, MatTableModule, MatFormFieldModule,
  MatInputModule, MatProgressSpinnerModule, MatTabsModule, 
  MatOptionModule, MatSelectModule, MatChipsModule, MatSlideToggleModule } from '@angular/material';
import { MapBoxComponent } from './map-box/map-box.component';
import { ROUTES } from './app.routes';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexyComponent } from './flexy/flexy.component';

@NgModule({
  declarations: [
    AppComponent,
    ListDetailComponent,
    ContactComponent,
    MapBoxComponent,
    MainNavComponent,
    FlexyComponent
  ],
  imports: [
     BrowserModule
    ,BrowserAnimationsModule
    ,HttpClientModule
    ,FlexLayoutModule
    ,RouterModule.forRoot(ROUTES)
    ,MatToolbarModule, MatButtonModule, MatSidenavModule
    ,MatIconModule, MatListModule, MatCheckboxModule, MatGridListModule
    ,MatCardModule, MatTableModule, MatFormFieldModule, MatInputModule
    ,MatProgressSpinnerModule, MatTabsModule, MatOptionModule
    ,MatSelectModule, MatChipsModule, MatSlideToggleModule
    ,AgmCoreModule.forRoot({apiKey: 'AIzaSyACOQCGoUpwh5oQY0EepOBMghKWddIItAg'})
  ],
  providers: [
     DataService
    //,MapService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
