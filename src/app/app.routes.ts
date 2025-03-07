import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', loadChildren: () => import('./features/contacts/autor.routes')},
  { path: '**', redirectTo: '/contacts' },
  { path: 'noticias', loadChildren:() => import('./features/contacts/noticia/noticia.routes') }
];
