import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { NgModel, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-prodcuts-list',
  templateUrl: './prodcuts-list.component.html',
  styleUrls: ['./prodcuts-list.component.css']
})
export class ProdcutsListComponent implements OnInit {

    public product: Product[];
    private subscription: Subscription;

    public oneProduct: Product;

    //form parameters
    public productNameControl: FormControl;
    public descriptionControl: FormControl;
    public skuControl: FormControl;
    public costControl: FormControl;
    public productForm: FormGroup;

    public productID;
    //parameter to hide buttons
    public disable;

    constructor(private router: Router,private authService: AuthService) { }

    ngOnInit() {

        this.productNameControl = new FormControl("", Validators.required);
        this.descriptionControl = new FormControl("", Validators.required);
        this.skuControl = new FormControl("", Validators.required);
        this.costControl = new FormControl("", Validators.required);

        this.productForm = new FormGroup({productNameControl: this.productNameControl,
            descriptionControl: this.descriptionControl,
            skuControl: this.skuControl,
            costControl: this.costControl
        });

        //default values
        this.productNameControl.setValue("");
        this.descriptionControl.setValue("");
        this.skuControl.setValue("");
        this.costControl.setValue("");
        this.disable = null;

        //check if user are signed in, if yes retrieve data to product array and if note navigate to login component
        if(this.authService.AccessToken){
            this.subscription = this.authService.getProductsAsync(this.authService.AccessToken)
                .subscribe(product => this.product = product);
        }else{
            this.router.navigate(['/']);
        }
    }

    //show description when click on product
    public showDescription(p){
        alert(p.description);
    }

    //function to delete product from the table
    public deleteProduct(p){
        var result = confirm("Are you sure?");
        if(result){
            this.subscription = this.authService.deleteProduct(this.authService.AccessToken, p.id).subscribe();

            //update the table
            this.product.forEach((prod, index) => {
                if (prod === p) this.product.splice(index, 1);
                
            });            
        }
    }

    //add product function 
    public addProduct(){
        //creating object from the values that the user entered
        var prod = new Product("",this.productNameControl.value, this.descriptionControl.value, this.skuControl.value,this.costControl.value);
        this.subscription =  this.authService.addNewProduct(this.authService.AccessToken, prod).subscribe();
        this.ngOnInit();
    }

    //function that changes the form from add product to edit product
    public editProductButton(p){
        this.productNameControl.setValue(p.name);
        this.descriptionControl.setValue(p.description);
        this.costControl.setValue(p.cost);
        this.skuControl.disable();
        this.productID = p.id;
        this.disable=1;
    }

    //edit product function
    public editProduct(){
        var prod = new Product(this.productID,this.productNameControl.value, this.descriptionControl.value, this.skuControl.value,this.costControl.value);
        this.subscription =  this.authService.editProduct(this.authService.AccessToken, prod).subscribe();
        this.ngOnInit();
    }

}
