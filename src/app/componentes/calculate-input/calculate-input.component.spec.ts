import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateInputComponent } from './calculate-input.component';

describe('CalculateInputComponent', () => {
  let component: CalculateInputComponent;
  let fixture: ComponentFixture<CalculateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
