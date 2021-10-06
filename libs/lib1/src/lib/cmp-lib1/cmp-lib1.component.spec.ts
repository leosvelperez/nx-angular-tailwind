import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpLib1Component } from './cmp-lib1.component';

describe('CmpLib1Component', () => {
  let component: CmpLib1Component;
  let fixture: ComponentFixture<CmpLib1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmpLib1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpLib1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
