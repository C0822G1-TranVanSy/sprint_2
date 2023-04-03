import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [LoginComponent, ProfileComponent],
    imports: [
        CommonModule,
        SecurityRoutingModule,
        ReactiveFormsModule
    ]
})
export class SecurityModule { }
