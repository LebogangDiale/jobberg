import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateresultsComponent } from './candidateresults.component';

describe('CandidateresultsComponent', () => {
  let component: CandidateresultsComponent;
  let fixture: ComponentFixture<CandidateresultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateresultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
