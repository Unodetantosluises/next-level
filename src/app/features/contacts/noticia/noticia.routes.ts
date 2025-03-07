import { Routes } from "@angular/router";

const noticiasRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('../card/card.component'). then(m => m.CardComponent),
  }
];

export default noticiasRoute;
