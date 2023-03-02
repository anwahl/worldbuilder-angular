import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialClassFormComponent } from './social-class-form.component';

describe('SocialClassFormComponent', () => {
  let component: SocialClassFormComponent;
  let fixture: ComponentFixture<SocialClassFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialClassFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
