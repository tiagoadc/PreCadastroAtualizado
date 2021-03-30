import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecaoFComponent } from './secao-f.component';

describe('SecaoFComponent', () => {
  let component: SecaoFComponent;
  let fixture: ComponentFixture<SecaoFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecaoFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecaoFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
