import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatureListComponent } from './creature-list.component';

describe('CreatureListComponent', () => {
  let component: CreatureListComponent;
  let fixture: ComponentFixture<CreatureListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatureListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
