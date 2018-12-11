import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBrowsingComponent } from './job-browsing.component';

describe('JobBrowsingComponent', () => {
  let component: JobBrowsingComponent;
  let fixture: ComponentFixture<JobBrowsingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobBrowsingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBrowsingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
