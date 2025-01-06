import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [

    { path: '', title: 'Home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
    { path: 'about', title: 'About', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) },
    { path: 'faq', title: 'FAQ', loadComponent: () => import('./components/faq/faq.component').then(m => m.FaqComponent) },
    { path: 'services', title: 'Services', loadComponent: () => import('./components/services/services.component').then(m => m.ServicesComponent) },
    { path: 'detail-services/:id', title: 'Detail Services', loadComponent: () => import('./components/detail-services/detail-services.component').then(m => m.DetailServicesComponent) },

    { path: 'login', canActivate: [loginGuard], title: 'Login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
    { path: 'register', canActivate: [loginGuard], title: 'Register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },

    {
        path: 'client', canActivate: [authGuard], title: 'Client', loadComponent: () => import('./components/client/client.component').then(m => m.ClientComponent)
        , children: [
            { path: '', title: 'stats', loadComponent: () => import('./components/client/stats/stats.component').then(m => m.StatsComponent) },
            { path: 'profile', title: 'profile', loadComponent: () => import('./components/client/profile/profile.component').then(m => m.ProfileComponent) },
            { path: 'my-services', title: 'my-services', loadComponent: () => import('./components/client/my-services/my-services.component').then(m => m.MyServicesComponent) },
            { path: 'my-proposals', title: 'my-proposals', loadComponent: () => import('./components/client/proposals/proposals.component').then(m => m.ProposalsComponent) },
            { path: 'post', title: 'post', loadComponent: () => import('./components/client/post/post.component').then(m => m.PostComponent) },
            { path: 'services-proposal/:id', title: 'services-proposal', loadComponent: () => import('./components/client/services-proposals/services-proposals.component').then(m => m.ServicesProposalsComponent) },
        ]
    },
];
