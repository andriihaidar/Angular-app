import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeComponent } from './daterange-modal.component';
import { MocksModule } from 'src/app/core/testing/mocks.module';

describe('DatepickerModalComponent', () => {
  let component: DateRangeComponent;
  let fixture: ComponentFixture<DateRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRangeComponent ],
      imports: [ MocksModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
