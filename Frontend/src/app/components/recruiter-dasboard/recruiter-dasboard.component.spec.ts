import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterDasboardComponent } from './recruiter-dasboard.component';

describe('RecruiterDasboardComponent', () => {
  let component: RecruiterDasboardComponent;
  let fixture: ComponentFixture<RecruiterDasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruiterDasboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
