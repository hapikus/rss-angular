import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DetailsComponent } from './pages/details/details.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    title: 'Main Page',
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin Page',
    canActivate: [authGuard],
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Details Page',
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page',
    canActivate: [loginGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not Found',
    canActivate: [authGuard],
  },
];
