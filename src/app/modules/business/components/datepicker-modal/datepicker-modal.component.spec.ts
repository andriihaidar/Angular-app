import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatepickerModalComponent } from './datepicker-modal.component';
import { MocksModule } from 'src/app/core/testing/mocks.module';

describe('DatepickerModalComponent', () => {
  let component: DatepickerModalComponent;
  let fixture: ComponentFixture<DatepickerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerModalComponent ],
      imports: [ MocksModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
