import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSortingGameSummaryComponent } from './word-sorting-game-summary.component';

describe('WordSortingGameSummaryComponent', () => {
  let component: WordSortingGameSummaryComponent;
  let fixture: ComponentFixture<WordSortingGameSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSortingGameSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordSortingGameSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
