import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecaoBComponent } from './secao-b.component';

describe('SecaoBComponent', () => {
  let component: SecaoBComponent;
  let fixture: ComponentFixture<SecaoBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecaoBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecaoBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
