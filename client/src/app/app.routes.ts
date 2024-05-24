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
import { authGuard } from './auth.guard';
import { ProfileComponent } from 'src/pages/profile/profile.component';
import { loginGuard } from './login.guard';
import { NotFoundComponent } from 'src/components/not-found/not-found.component';
import { ProductComponent } from './product/product.component';
import { AddProductComponent } from 'src/components/add-product/add-product.component';
import { EditProductComponent } from 'src/components/edit-product/edit-product.component';

export const routes: Routes = [
    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [loginGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
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
                path: 'product',
                component: ProductComponent,
                children: [
                    {
                        path: "add",
                        component: AddProductComponent
                    },
                    {
                        path: "edit",
                        component: EditProductComponent
                    },
                ]
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
                        path: 'profile',
                        component: ProfileComponent
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
                component: NotFoundComponent,
            }
        ]
    }
];
