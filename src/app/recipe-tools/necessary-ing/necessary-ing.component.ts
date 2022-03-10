import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/recipes.service';
import { ingredients } from 'src/app/ingredients';


@Component({
  selector: 'app-necessary-ing',
  templateUrl: './necessary-ing.component.html',
  styleUrls: ['./necessary-ing.component.css'],
  providers: [RecipesService]
})
export class NecessaryIngComponent implements OnInit {
  datas : any = [] //donnée provenant du serveur
  orderact : any = [] //donnée provenant du session storage
  ingredients : any = [] //toutes les ingredients nécessaires
  needslist : any = [] //les ingredients manquants
  forUpdate : any = [] //les ingredients à modifier dans le serveur en validant
  constructor(private RecipesService : RecipesService ) {
      
   }

  ngOnInit(): void {
    this.RecipesService.getIngredients().subscribe((data : any[])=>{
      this.datas = data
    })
    this.orderact = this.RecipesService.getOrders()
    this.ingredients = this.extractComp()
    this.compare()
    }

  extractComp(): any{
      //ingredients séparés en 3 tableaux
      let ext = this.orderact.map((comp: { content: any; })=>comp.content)
      
      
      //concatenation des tableaux en une seule ext1
      let ext1 : any = []
      let i : any = 0
      while(i<ext.length){
        ext1 = ext1.concat(ext[i])
        i++
      }
      
      //elimination des doublons en les additionnant
      let temp : any = {}
      ext1.forEach((el: any) => {
        if(el.name in temp){
          temp[el.name] += el.quantity
        } else {
          temp[el.name] = el.quantity
        }
      });
      let ingredients = []
      for (let u in temp){
        ingredients.push({name : u , quantity : temp[u]})
      }
      return ingredients;
    }
    
    async compare():Promise<void>{
      let response = await this.RecipesService.getIngredients().toPromise();
      let needslist : any = []
      let forUpdate : any = []
      if(response!=''){
        for(let ing of this.ingredients){
          let needed = response.find((el: { name: string; })=>el.name==ing.name)
          if(!needed){
            needslist.push({name : ing.name , quantity : ing.quantity})
          }
          else if((needed.quantity-ing.quantity)<0){
            needslist.push({name : ing.name , quantity : ing.quantity-needed.quantity})
          }
          else if((needed.quantity-ing.quantity)>=0){
            forUpdate.push({name : ing.name , quantity : needed.quantity-ing.quantity})
          }
        }
      }
      this.forUpdate = forUpdate 
      this.needslist = needslist
    }
      
    put1(value: any){
      this.RecipesService.updateIngredients(value).subscribe((data: any) => console.log(data))
    }

    putAll(){
      for(let el of this.forUpdate){
        this.put1(el)
      }
    }
      
      
    

  
  
}
