import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportSalaryComponent } from './user-report-salary.component';

describe('UserReportSalaryComponent', () => {
  let component: UserReportSalaryComponent;
  let fixture: ComponentFixture<UserReportSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReportSalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserReportSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
