import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCommentAreaComponent } from './input-comment-area.component';

describe('InputCommentAreaComponent', () => {
  let component: InputCommentAreaComponent;
  let fixture: ComponentFixture<InputCommentAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputCommentAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCommentAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
