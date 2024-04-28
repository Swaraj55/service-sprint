import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { SignupPageRoutingModule } from './signup-page-routing.module';
import { SignupPageComponent } from './signup-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignupPageComponent
  ],
  exports: [
    SignupPageComponent
  ],
  imports: [
    CommonModule,
    SignupPageRoutingModule,

    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SignupPageModule { }
