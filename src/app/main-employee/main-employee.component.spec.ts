import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEmployeeComponent } from './main-employee.component';

describe('MainEmployeeComponent', () => {
  let component: MainEmployeeComponent;
  let fixture: ComponentFixture<MainEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
