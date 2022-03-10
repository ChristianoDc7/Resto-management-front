import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-tools',
  templateUrl: './recipe-tools.component.html',
  styleUrls: ['./recipe-tools.component.css'],
  providers : [RecipesService]
})
export class RecipeToolsComponent implements OnInit {
  public totalOrders : any = 0
  
  constructor(private router: Router , private RecipesService : RecipesService , private dialog : MatDialog) { }

  ngOnInit(){
    this.totalOrders = this.calcTotal();
  }
  //menus disponible avec leurs données
  menus : any = [
    {name : 'Burger', Description :'Chicken', img:'../../assets/image/burger.jpg', content : [{name:'Charcuterie', quantity : 1}, {name : 'Tomates', quantity : 2 },  {name : 'Pain', quantity : 1 } ] },
    {name : 'Sandwich', Description :'Kebab', img:'../../assets/image/istockphoto-157428069-612x612.jpg' , content :  [ {name:'Fromage', quantity : 2}, {name : 'Mayonnaise', quantity : 1 },  {name : 'Pain', quantity : 1 }, {name : 'Salades', quantity : 1 } ] },
    {name : 'Pizza', Description :'Feu de bois', img:'../../assets/image/mouth-watering-delicious-cheese-pizza-260nw-1637074219.jpg' , content :  [ {name:'Fromage', quantity : 4}, {name : 'Tomates', quantity : 2 } ]}
  ]

  //tableau des commandes
  orders : any = this.RecipesService.getOrders()

  //total des commandes
  calcTotal():any{
    return this.orders.map((item: { count: any; })=>item.count).reduce((prev: any,curr: any)=>prev+curr,0)  
  }
  

  
  //ajout de commande
  addOrder(value :any){
    if(this.orders.find((el: { name: any; })=>el.name==value)){
      this.incrementOrder(value)
    }
    else {
      let content = this.findcomp(value);
      this.pushOrder({name: value , count: 1 , content : content})
    }
    this.totalOrders = this.calcTotal();

  }

  pushOrder( value:any ){
    this.orders.push(value)
  }

  incrementOrder(value : any){
    for (let i of this.orders){
      if(i.name == value ){
        //incrementation nb commandes
         i.count++

         //incrementation nb ingredients
         for (let u : any  = 0 ; u < i.content.length ; u++) {
          i.content[u]['quantity'] *= (i.count/(i.count-1))
         }
      }
    }
  }
  
  //recherche composant repas dans la base initiale
  findcomp(value : any){
    for (let i of this.menus){
      if(i.name == value ){
         return i.content
      }
    }
  }

  //effacement d'un commande
  removeOrder(value : any){
    this.orders = this.orders.filter((o: { name: void; }) => o.name != value)
    this.totalOrders = this.calcTotal();

  }

  //effacer tous les commandes 
  removeAll(){
    this.orders = []
    this.RecipesService.setOrders(this.orders)
    this.totalOrders = this.calcTotal();

  }
  

  //dialog confirmation delete
  openDelete(){
    this.dialog.open(confirmdelete , {
      data : { del : ()=>{this.removeAll()}}
    })
  }


  //validation vers verification ingredients
  Validate(){
    this.RecipesService.setOrders(this.orders)
    this.router.navigate(['/necessary'])
  }

}

//composant du dialog confirmation suppression
@Component({
  selector : 'confirm-delete',
  template : `<h4 mat-dialog-title>Do you really want to remove your order ?</h4>
  <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button cdkFocusInitial (click)="confirm()" mat-dialog-close>OK</button>
  </mat-dialog-actions>`,
  
  
})

export class confirmdelete{

  constructor (@Inject(MAT_DIALOG_DATA) public data : any ){}
  
  //confirmation suppression
  confirm(){
   this.data.del()
  }
}