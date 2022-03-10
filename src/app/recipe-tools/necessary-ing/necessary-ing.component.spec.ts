import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessaryIngComponent } from './necessary-ing.component';

describe('NecessaryIngComponent', () => {
  let component: NecessaryIngComponent;
  let fixture: ComponentFixture<NecessaryIngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessaryIngComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NecessaryIngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
