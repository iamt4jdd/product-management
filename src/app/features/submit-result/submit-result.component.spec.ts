import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitResultComponent } from './submit-result.component';

describe('SubmitResultComponent', () => {
  let component: SubmitResultComponent;
  let fixture: ComponentFixture<SubmitResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
