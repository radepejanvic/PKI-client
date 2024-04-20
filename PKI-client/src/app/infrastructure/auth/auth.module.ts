import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';


@NgModule({
  declarations: [LogInComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  exports: [
    LogInComponent
  ]
})
export class AuthModule { }
