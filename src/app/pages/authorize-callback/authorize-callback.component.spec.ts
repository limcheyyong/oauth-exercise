import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeCallbackComponent } from './authorize-callback.component';

describe('AuthorizeCallbackComponent', () => {
  let component: AuthorizeCallbackComponent;
  let fixture: ComponentFixture<AuthorizeCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeCallbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
