import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpLib2Component } from './cmp-lib2.component';

describe('CmpLib2Component', () => {
  let component: CmpLib2Component;
  let fixture: ComponentFixture<CmpLib2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmpLib2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpLib2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
