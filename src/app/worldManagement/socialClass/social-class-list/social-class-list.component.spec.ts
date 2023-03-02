import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialClassListComponent } from './social-class-list.component';

describe('SocialClassListComponent', () => {
  let component: SocialClassListComponent;
  let fixture: ComponentFixture<SocialClassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialClassListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialClassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
