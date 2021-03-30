import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecaoDComponent } from './secao-d.component';

describe('SecaoDComponent', () => {
  let component: SecaoDComponent;
  let fixture: ComponentFixture<SecaoDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecaoDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecaoDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
