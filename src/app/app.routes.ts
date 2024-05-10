import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsComponent } from './pages/forms/forms.component';
import { ButtonsComponent } from './pages/buttons/buttons.component';
import { CardsComponent } from './pages/cards/cards.component';
import { MultipleFilesComponent } from './pages/multiple-files/multiple-files.component';
import { DropdownComponent } from './pages/dropdown/dropdown.component';

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
        ]
    }
];
