import { Route } from '@angular/router';
export const routes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/home-page/home-page.component').then(
        (m) => m.HomePageComponent
      ),
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('../pages/services-page/services-page.component').then(
        (m) => m.ServicesPageComponent
      ),
  },
  {
    path: 'sobre-nosotros',
    loadComponent: () =>
      import('../pages/about-us-page/about-us-page.component').then(
        (m) => m.AboutUsPageComponent
      ),
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('../pages/contact-page/contact-page.component').then(
        (m) => m.ContactPageComponent
      ),
  },
  {
    path: 'soy-abogado',
    loadComponent: () =>
      import('../pages/im-lawyer-page/im-lawyer-page.component').then(
        (m) => m.ImLawyerPageComponent
      ),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import(
        '../pages/register-lawyer-page/register-lawyer-page.component'
      ).then((m) => m.RegisterLawyerPageComponent),
  },
];
