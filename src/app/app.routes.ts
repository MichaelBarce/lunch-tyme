
import { Routes, CanActivate } from '@angular/router';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { ContactComponent } from './contact/contact.component';


export const ROUTES: Routes = [
  { path: '', component: ListDetailComponent },
  { path: 'listdetail', component: ListDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];
