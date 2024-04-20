import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './infrastructure/auth/log-in/log-in.component';
import { CertRequestsComponent } from './certificate/cert-requests/cert-requests.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path : "login", component : LogInComponent,},
  {path : "cert-requests", component: CertRequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
