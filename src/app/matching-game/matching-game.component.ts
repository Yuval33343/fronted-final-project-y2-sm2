import { Component, Input, OnInit } from '@angular/core';
import { CategorySelectionComponent } from '../category-selection/category-selection.component';
import { Category } from '../shared/model/category';
import { CategoryService } from '../services/category.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-matching-game',
  standalone: true,
  imports: [CategorySelectionComponent,CommonModule],
  templateUrl: './matching-game.component.html',
  styleUrl: './matching-game.component.css'
})
export class MatchingGameComponent implements OnInit {
  @Input() selectedCategoryId?: string;
  category?: Category;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      const gameId = params['gameId'];
      // Fetch the selected category based on categoryId
      this.category = this.categoryService.get(parseInt(categoryId));
    });
  }
}
