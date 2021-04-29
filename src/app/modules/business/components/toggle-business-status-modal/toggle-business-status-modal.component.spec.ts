import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MocksModule } from 'src/app/core/testing/mocks.module';
import { ToggleBusinessStatusModalComponent } from './toggle-business-status-modal.component';

describe('ToggleBusinessStatusModalComponent', () => {
  let component: ToggleBusinessStatusModalComponent;
  let fixture: ComponentFixture<ToggleBusinessStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleBusinessStatusModalComponent ],
      imports: [ MocksModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleBusinessStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
