import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpLib3Component } from './cmp-lib3.component';

describe('CmpLib3Component', () => {
  let component: CmpLib3Component;
  let fixture: ComponentFixture<CmpLib3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmpLib3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpLib3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
