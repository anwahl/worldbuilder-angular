import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalSystemFormComponent } from './political-system-form.component';

describe('PoliticalSystemFormComponent', () => {
  let component: PoliticalSystemFormComponent;
  let fixture: ComponentFixture<PoliticalSystemFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticalSystemFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticalSystemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
