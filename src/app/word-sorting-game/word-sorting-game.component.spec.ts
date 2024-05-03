import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSortingGameComponent } from './word-sorting-game.component';

describe('WordSortingGameComponent', () => {
  let component: WordSortingGameComponent;
  let fixture: ComponentFixture<WordSortingGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSortingGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordSortingGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
