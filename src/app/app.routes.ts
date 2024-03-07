

import { Routes } from '@angular/router';
import { CategoryTableComponent } from './category-table/category-table.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategorySelectionComponent } from './category-selection/category-selection.component';
import { TranslateComponent } from './translate/translate.component';
import { FooterHelpComponent } from './footer-help/footer-help.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', component: CategoryTableComponent }, 
  { path: 'categoryform/:idString', component: CategoryFormComponent }, 
  { path: 'categorynew', component: CategoryFormComponent },
  { path: 'category-selection', component: CategorySelectionComponent },
  { path: 'translate/:selectedCategoryId', component: TranslateComponent},
  { path: 'app-footer-help', component: FooterHelpComponent },
  { path: 'app-dashboard', component: DashboardComponent },
]
