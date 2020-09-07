import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectColorMenuButtonComponent } from './select-color-menu-button.component';

describe('SelectColorMenuButtonComponent', () => {
  let component: SelectColorMenuButtonComponent;
  let fixture: ComponentFixture<SelectColorMenuButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectColorMenuButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectColorMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
