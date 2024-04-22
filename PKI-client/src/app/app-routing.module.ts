import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './infrastructure/auth/log-in/log-in.component';
import { CertRequestsComponent } from './certificate/cert-requests/cert-requests.component';
import {CertTreeComponent} from "./certificate/cert-tree/cert-tree.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path : "login", component : LogInComponent,},
  {path : "cert-requests", component: CertRequestsComponent},
  {path : "cert-tree", component: CertTreeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
