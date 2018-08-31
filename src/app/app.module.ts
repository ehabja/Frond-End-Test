import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProdcutsListComponent } from './prodcuts-list/prodcuts-list.component';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './shared/services/auth.service';

import { HttpClientModule } from "@angular/common/http";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProdcutsListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule, 
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
