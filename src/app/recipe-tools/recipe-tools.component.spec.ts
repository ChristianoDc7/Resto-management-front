import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeToolsComponent } from './recipe-tools.component';

describe('RecipeToolsComponent', () => {
  let component: RecipeToolsComponent;
  let fixture: ComponentFixture<RecipeToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
