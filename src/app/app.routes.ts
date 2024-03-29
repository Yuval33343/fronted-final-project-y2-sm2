import { Routes } from '@angular/router';
import { CategoryTableComponent } from './category-table/category-table.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategorySelectionComponent } from './category-selection/category-selection.component';
import { TranslateComponent } from './translate/translate.component';
import { FooterHelpComponent } from './footer-help/footer-help.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatchingGameComponent } from '../matching-game-module/matching-game/matching-game.component';
import { GameSummaryComponent } from './game-summary/game-summary.component';


export const routes: Routes = [
  { path: '', component: DashboardComponent }, 
  { path: 'categoryform/:idString', component: CategoryFormComponent }, 
  { path: 'categorynew', component: CategoryFormComponent },
  { path: 'category-selection', component: CategorySelectionComponent },
  { path: 'translate/:selectedCategoryId', component: TranslateComponent},
  { path: 'app-footer-help', component: FooterHelpComponent },
  { path: 'app-category-table', component: CategoryTableComponent },
  { path: 'matching-game', component: MatchingGameComponent },
  { path: 'game-summary', component: GameSummaryComponent },
]
