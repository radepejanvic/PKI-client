import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertRequestsComponent } from './cert-requests/cert-requests.component';



@NgModule({
  declarations: [
    CertRequestsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CertRequestsComponent
  ]
})
export class CertificateModule { }
