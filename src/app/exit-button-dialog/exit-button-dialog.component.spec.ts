import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitButtonDialogComponent } from './exit-button-dialog.component';

describe('ExitButtonDialogComponent', () => {
  let component: ExitButtonDialogComponent;
  let fixture: ComponentFixture<ExitButtonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExitButtonDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExitButtonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
