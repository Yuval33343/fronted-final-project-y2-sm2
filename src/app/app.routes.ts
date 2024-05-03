import { Routes } from '@angular/router';
import { CategoryTableComponent } from './category-table/category-table.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategorySelectionComponent } from './category-selection/category-selection.component';
import { TranslateComponent } from './translate/translate.component';
import { FooterHelpComponent } from './footer-help/footer-help.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatchingGameComponent } from '../matching-game-module/matching-game/matching-game.component';
import { GameSummaryComponent } from './matching-game-summary/game-summary.component';
import { MixedLettersComponent } from './mixed-letters/mixed-letters.component';
import { WordSortingGameComponent } from './word-sorting-game/word-sorting-game.component';


export const routes: Routes = [
  { path: '', component: DashboardComponent }, 
  { path: 'categoryform/:idString', component: CategoryFormComponent }, 
  { path: 'categorynew', component: CategoryFormComponent },
  { path: 'category-selection', component: CategorySelectionComponent },
  { path: 'translate/:selectedCategoryId', component: TranslateComponent},
  { path: 'app-footer-help', component: FooterHelpComponent },
  { path: 'app-category-table', component: CategoryTableComponent },
  { path: 'matching-game/:selectedCategoryId', component: MatchingGameComponent },
  { path: 'mixed-letters/:selectedCategoryId', component: MixedLettersComponent },
  { path: 'game-summary', component: GameSummaryComponent },
  { path: 'sorting-game/:selectedCategoryId', component: WordSortingGameComponent },

]
