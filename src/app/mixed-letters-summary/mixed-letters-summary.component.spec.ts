import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedLettersSummaryComponent } from './mixed-letters-summary.component';

describe('MixedLettersSummaryComponent', () => {
  let component: MixedLettersSummaryComponent;
  let fixture: ComponentFixture<MixedLettersSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MixedLettersSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MixedLettersSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
