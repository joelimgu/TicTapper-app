import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastJobInfoComponent } from './last-job-info.component';

describe('LastJobInfoComponent', () => {
  let component: LastJobInfoComponent;
  let fixture: ComponentFixture<LastJobInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastJobInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastJobInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
