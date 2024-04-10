import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameExitButtonComponent } from './game-exit-button.component';

describe('GameExitButtonComponent', () => {
  let component: GameExitButtonComponent;
  let fixture: ComponentFixture<GameExitButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameExitButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameExitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
