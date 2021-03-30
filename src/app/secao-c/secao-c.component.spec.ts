import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecaoCComponent } from './secao-c.component';

describe('SecaoCComponent', () => {
  let component: SecaoCComponent;
  let fixture: ComponentFixture<SecaoCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecaoCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecaoCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
