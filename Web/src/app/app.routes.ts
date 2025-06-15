import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/container/home-main-container.component').then(
        (m) => m.HomeMainContainerComponent
      ),
  },
];
