import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SlotsModalComponent } from './slots-modal.component';
import { MocksModule } from 'src/app/core/testing/mocks.module';

describe('SlotsModalComponent', () => {
  let component: SlotsModalComponent;
  let fixture: ComponentFixture<SlotsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotsModalComponent ],
      imports: [ MocksModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
