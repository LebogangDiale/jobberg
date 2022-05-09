import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealLoginComponent } from './real-login.component';

describe('RealLoginComponent', () => {
  let component: RealLoginComponent;
  let fixture: ComponentFixture<RealLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
