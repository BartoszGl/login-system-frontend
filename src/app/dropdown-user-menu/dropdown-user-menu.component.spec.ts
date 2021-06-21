import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownUserMenuComponent } from './dropdown-user-menu.component';

describe('DropdownUserMenuComponent', () => {
  let component: DropdownUserMenuComponent;
  let fixture: ComponentFixture<DropdownUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownUserMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
