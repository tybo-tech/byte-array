import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesPageComponent } from './services-page/services-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { QuotesComponent } from './quotes/quotes.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  //services
  {
    path: 'services',
    component: ServicesPageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
  {
    path: 'quotes',
    component: QuotesComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
