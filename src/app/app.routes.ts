import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './views/register/register.component';
import { HelpUserComponent } from './views/help-user/help-user.component';
import { LoginComponent } from './views/login/login.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { SettingComponent } from './components/setting/setting.component';
import { DashboardAdminComponent } from './views/dashboard-admin/dashboard-admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';
import { TestComponent } from './components/test/test.component';
import { EstadoPruebaComponent } from './components/estado-prueba/estado-prueba.component';
import { PruebasAdminComponent } from './views/pruebas-admin/pruebas-admin.component';
import { PruebaDetailsComponent } from './views/prueba-details/prueba-details.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardViewComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'test',
                component: TestComponent
            },
            {
                path: 'profile',
                component: ProfileComponent,
            },
            {
                path: 'estado-prueba',
                component: EstadoPruebaComponent
            }
        ]
    },
    { path: 'dashboard-admin', component: DashboardAdminComponent },
    { path: 'pruebas-admin', component: PruebasAdminComponent },
    { path: 'prueba/:id', component: PruebaDetailsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'help-user', component: HelpUserComponent },
    { path: 'login', component: LoginComponent },
    { path: 'landing-page', component: LandingPageComponent },
    { path: 'setting', component: SettingComponent },
    {
        path: '',
        redirectTo: 'landing-page',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }