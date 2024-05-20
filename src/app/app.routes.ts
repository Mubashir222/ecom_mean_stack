import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { MultipleFilesComponent } from './multiple-files/multiple-files.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { AuthPagesComponent } from 'src/app/auth-pages/auth-pages.component';
import { NestedLayoutComponent } from 'src/pages/nested-layout/nested-layout.component';
import { LoginComponent } from 'src/pages/login/login.component';
import { SignupComponent } from 'src/pages/signup/signup.component';
import { ForgotPasswordComponent } from 'src/pages/forgot-password/forgot-password.component';
import { ContactComponent } from 'src/pages/contact/contact.component';
import { UserDataComponent } from 'src/pages/user-data/user-data.component';

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
                path: 'pages',
                component: NestedLayoutComponent,
                children: [
                    {
                        path: 'login',
                        component: LoginComponent
                    },
                    {
                        path: 'signup',
                        component: SignupComponent
                    },
                    {
                        path: 'forgot-password',
                        component: ForgotPasswordComponent
                    },
                    {
                        path: 'auth-user',
                        component: UserDataComponent
                    },
                    {
                        path: 'contact',
                        component: ContactComponent
                    },
                ]
            },
            {
                path: '**',
                redirectTo: 'dashboard'
            }
        ]
    }
];
