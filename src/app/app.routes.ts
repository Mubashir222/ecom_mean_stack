import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { MultipleFilesComponent } from './multiple-files/multiple-files.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { AuthPagesComponent } from 'src/app/auth-pages/auth-pages.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
    },
    {
        path: '',
        component: LayoutComponent,
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
            {
                path: 'multiFiles',
                component: MultipleFilesComponent
            },
            {
                path: 'dropdowns',
                component: DropdownComponent
            },
            {
                path: 'auth',
                component: AuthPagesComponent
            },
            {
                path: '**',
                redirectTo: 'dashboard'
            }
        ]
    }
];
