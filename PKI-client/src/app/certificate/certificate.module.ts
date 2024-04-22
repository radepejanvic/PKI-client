import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertRequestsComponent } from './cert-requests/cert-requests.component';
import { CertTreeComponent } from './cert-tree/cert-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";
import { CertDetailsComponent } from './cert-details/cert-details.component';
import {MatSelectModule} from "@angular/material/select";
import { MaterialModule } from '../infrastructure/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CertRequestsComponent,
    CertTreeComponent,
    CertDetailsComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MaterialModule
  ],
  exports: [
    CertRequestsComponent,
    CertTreeComponent
  ]
})
export class CertificateModule { }
