import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { NecessaryIngComponent } from './recipe-tools/necessary-ing/necessary-ing.component';
import { RecipeToolsComponent } from './recipe-tools/recipe-tools.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  {path: 'recipe', component: RecipeToolsComponent},
  {path: 'sales' , component: SalesComponent},
  {path: 'about' , component:AboutComponent},
  {path: 'necessary', component: NecessaryIngComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
