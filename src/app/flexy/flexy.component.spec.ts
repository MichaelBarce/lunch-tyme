import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexyComponent } from './flexy.component';

describe('FlexyComponent', () => {
  let component: FlexyComponent;
  let fixture: ComponentFixture<FlexyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
