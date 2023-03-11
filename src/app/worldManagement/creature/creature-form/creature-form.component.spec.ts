import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatureFormComponent } from './creature-form.component';

describe('CreatureFormComponent', () => {
  let component: CreatureFormComponent;
  let fixture: ComponentFixture<CreatureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatureFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
