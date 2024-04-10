import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterHelpComponent } from './footer-help.component';

describe('FooterHelpComponent', () => {
  let component: FooterHelpComponent;
  let fixture: ComponentFixture<FooterHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
