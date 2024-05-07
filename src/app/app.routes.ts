import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsComponent } from './pages/forms/forms.component';
import { ButtonsComponent } from './pages/buttons/buttons.component';
import { CardsComponent } from './pages/cards/cards.component';
import { DashboardSideBarComponent } from './pages/dashboard-side-bar/dashboard-side-bar.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: DashboardSideBarComponent,
                children: [
                    {
                        path: 'dashboard',
                        component: DashboardComponent,
                    },
                    {
                        path: 'forms',
                        component: FormsComponent
                    },
                    {
                        path: 'buttons',
                        component: ButtonsComponent
                    },
                    {
                        path: 'cards',
                        component: CardsComponent
                    },
                ]
            }
        ]
    }
];
