import { RoleGuard } from './helpers/role.guard';
import { UsersListComponent } from './users-list/users-list.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './helpers/auth.guard';
import { HomeComponent } from './home/home.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { UsersListResolverService } from './services/users-list-resolver.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  {
    path: 'users', component: UsersListComponent, canActivate: [AuthGuard, RoleGuard],
    runGuardsAndResolvers: 'always',
    resolve: { resolvedUsers: UsersListResolverService }
  },
  { path: 'accessDenied', component: AccessDeniedComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
