import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFirmComponent } from './table-firm.component';

describe('TableFirmComponent', () => {
  let component: TableFirmComponent;
  let fixture: ComponentFixture<TableFirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
