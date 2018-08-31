import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProdcutsListComponent } from './prodcuts-list/prodcuts-list.component';


const appRoutes: Routes = [
    { path: "", component: LoginComponent },
    { path: "productsList", component: ProdcutsListComponent },
    { path: '**', redirectTo: '' }

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ]
})
export class AppRoutingModule { }
