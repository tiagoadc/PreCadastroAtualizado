import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecaoEComponent } from './secao-e.component';

describe('SecaoEComponent', () => {
  let component: SecaoEComponent;
  let fixture: ComponentFixture<SecaoEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecaoEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecaoEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
