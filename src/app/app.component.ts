import { Component , AfterViewInit ,ViewChild  } from '@angular/core';
import { RecipeToolsComponent } from './recipe-tools/recipe-tools.component';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers : [RecipesService]
})


export class AppComponent implements AfterViewInit{
  
  badge : number = 0

  @ViewChild(RecipeToolsComponent) child: any ;
  ngAfterViewInit(): void {
    
    console.log(this.badge)
  }
  setbadge(){
    
  }
  
}
