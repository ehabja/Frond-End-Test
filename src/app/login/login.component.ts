import { Component, OnInit, Input } from '@angular/core';
import { NgModel, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../shared/models/product.model';
import { AuthService } from '../shared/services/auth.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit { 

    //form data
    public authKeyControl: FormControl;
    public loginForm: FormGroup;

    //product type array
    public product: Product[];
    public error: String;

    //parameter for checking if user have signed in
    public access: String;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() {

        //auth key is required
        this.authKeyControl = new FormControl("", Validators.required);

        this.loginForm = new FormGroup({authKeyControl: this.authKeyControl
        });

    }

    //submit button
    public submit(){
        //authorize with the key thath the user entered, navigate to product list component if success
        this.authService.login(this.authKeyControl.value)
            .subscribe(
                data => {
                    this.product = data;
                    this.authService.AccessToken = this.authKeyControl.value;
                    this.router.navigate(['/productsList']);
                },
                error => {
                    this.error = error;
                }
            )   
        
    }

}
