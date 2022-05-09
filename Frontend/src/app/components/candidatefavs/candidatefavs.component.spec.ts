import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatefavsComponent } from './candidatefavs.component';

describe('CandidatefavsComponent', () => {
  let component: CandidatefavsComponent;
  let fixture: ComponentFixture<CandidatefavsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatefavsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatefavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
