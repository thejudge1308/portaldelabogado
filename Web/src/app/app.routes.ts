import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/routing/home.routing').then((m) => m.homeRoutes),
  },
];
