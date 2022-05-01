import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ingredients } from './ingredients';
import { order } from './order';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  //from php api
  private baseurl : string = 'http://localhost/resto_api/ingredients/'
  private readUrl : string = this.baseurl+'read.php'
  private updateUrl : string = this.baseurl+'update.php'

  constructor(private httpClient : HttpClient) { }

  //get request
  getIngredients():any{
    return this.httpClient.get<ingredients[]>(this.readUrl)
  }

  //put request
  updateIngredients(body: ingredients):any{
    return this.httpClient.put<ingredients[]>(this.updateUrl, body)
  }


  //session storage 
   key  = "keyorder"

 getOrders() : order[]{
    let orders = window.sessionStorage.getItem(this.key)
    if (!orders) {
        window.sessionStorage.setItem(this.key, JSON.stringify([]));
        return [];
    }
    return JSON.parse(orders)
}

  setOrders(orders: any) {
    window.sessionStorage.setItem(this.key, JSON.stringify(orders));
} 

}
