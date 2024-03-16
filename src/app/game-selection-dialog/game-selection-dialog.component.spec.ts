import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSelectionDialogComponent } from './game-selection-dialog.component';

describe('GameSelectionDialogComponent', () => {
  let component: GameSelectionDialogComponent;
  let fixture: ComponentFixture<GameSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameSelectionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
