import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { HttpClientModule } from '@angular/common/http';
import { DeleteconfirmationComponent } from './modules/deleteconfirmation/deleteconfirmation.component';
import { LoginComponent } from './modules/login/login.component';

import { NavComponent } from './modules/nav/nav.component';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { OutRtgsAtsComponent } from './out-rtgs-ats/out-rtgs-ats.component';
import { InreconcilationComponent } from './modules/inreconcilation/inreconcilation.component';
import { InRtgsAtsComponent } from './modules/in-rtgs-ats/in-rtgs-ats.component';
import {  NgxUiLoaderModule, NgxUiLoaderRouterModule, SPINNER} from 'ngx-ui-loader';


@NgModule({
  declarations: [
    AppComponent,

 




  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
       DefaultModule,
       HttpClientModule,
       NgxUiLoaderModule.forRoot({
        bgsType: SPINNER.threeStrings,
      }),
      NgxUiLoaderRouterModule,
     
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
