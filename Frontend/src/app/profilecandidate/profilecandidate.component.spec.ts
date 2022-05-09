import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecandidateComponent } from './profilecandidate.component';

describe('ProfilecandidateComponent', () => {
  let component: ProfilecandidateComponent;
  let fixture: ComponentFixture<ProfilecandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilecandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilecandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
