import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Product } from "../models/product.model";



@Injectable({ providedIn: 'root' })
export class AuthService{

    //checking if user are signed in and to do CRUD on the specific key
    AccessToken: String = "";

    constructor(private http: HttpClient) { }

    private API_URL = 'http://frontend.test.cloudonix.io/items';

    //login and authorize function
    public login(auth_token): Observable<any>{
        const httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth_token
        })
        return this.http.get(this.API_URL, { headers: httpHeaders });

    }

    //retrieving data function
    public getProductsAsync(auth_token): Observable<Product[]>{
        const httpHeaders = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth_token
        })
        return this.http.get(this.API_URL, { headers: httpHeaders })
            .pipe(
                map((products: Product[]) => {
                    return products.filter(products => products != null);
                },error => error)
            )
    }

    //delete one product from data
    public deleteProduct(auth_token, id): Observable<Product> {
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth_token
          })
        return this.http.delete(this.API_URL + "/" + id, { headers: httpHeaders})
            .pipe(
                map((product: Product) => product)
            )
    }

    //add new product function
    public addNewProduct(auth_token, product): Observable<Product> {
        
        const obj = {
            "name": product.name,
            "description": product.description,
            "sku": product.sku,
            "cost": product.cost
        };

        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth_token
          })
        return this.http.post(this.API_URL, obj, { headers: httpHeaders})
          .pipe(
            map((product: Product) => product)
          )
    }

    //edit product function
    public editProduct(auth_token, product): Observable<Product> {
        const obj = {
            "name": product.name,
            "description": product.description,
            "cost": product.cost
        };

        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth_token
          })
          return this.http.patch(this.API_URL + "/" + product.id, obj,{ headers: httpHeaders})
          .pipe(
            map((product: Product) => product)
          )
    }
}
