
import { Routes, CanActivate } from '@angular/router';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ContactComponent } from './contact/contact.component';
import { MapBoxComponent } from './map-box/map-box.component';

export const ROUTES: Routes = [
  { path: '', component: ListDetailComponent },
  { path: 'listdetail', component: ListDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'mapbox', component: MapBoxComponent },
  { path: '**', redirectTo: '' }
];
