
import { Routes, CanActivate } from '@angular/router';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ContactComponent } from './contact/contact.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { FlexyComponent } from './flexy/flexy.component';

export const ROUTES: Routes = [
  { path: '', component: ListDetailComponent },
  { path: 'listdetail', component: ListDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'mapbox', component: MapBoxComponent },
  { path: 'flexy', component: FlexyComponent },
  { path: '**', redirectTo: '' }
];
