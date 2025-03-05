import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';


import { AdminAuthGuardSecondService } from './service/admin-auth-guard-second.service';
import { AdminAuthGuardThirdService } from './service/admin-auth-guard-Third.service';
import { AdminComponent } from './modules/admin/admin.component';
import { AdminAuthAdminGuardService } from './service/admin-auth-admin-guard.service';
import { ReconcilationComponent } from './modules/reconcilation/reconcilation.component';
import { OutRtgsAtsComponent } from './out-rtgs-ats/out-rtgs-ats.component';
import { InreconcilationComponent } from './modules/inreconcilation/inreconcilation.component';
import { InRtgsAtsComponent } from './modules/in-rtgs-ats/in-rtgs-ats.component';

 // Create this component for 404 page

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'Change', component: ChangePasswordComponent },
 
      {
        path: 'Reconcilation',
        component: ReconcilationComponent,
        canActivate: [AdminAuthGuardService]
      },
      {
        path: 'OutRtgsAts',
        component: OutRtgsAtsComponent,
        canActivate: [AdminAuthGuardService]
      },
      {
        path: 'InReconcilation',
        component: InreconcilationComponent,
        canActivate: [AdminAuthGuardService]
      },
      {
        path: 'InRtgsAts',
        component: InRtgsAtsComponent,
        canActivate: [AdminAuthGuardService]
      },
      {
        path: 'Admin',
        component: AdminComponent,
        canActivate: [AdminAuthAdminGuardService],
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
