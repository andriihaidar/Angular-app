import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitBusinessRequestModalComponent } from './submit-business-request-modal.component';
import { MocksModule } from 'src/app/core/testing/mocks.module';

describe('SubmitBusinessRequestModalComponent', () => {
  let component: SubmitBusinessRequestModalComponent;
  let fixture: ComponentFixture<SubmitBusinessRequestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitBusinessRequestModalComponent ],
      imports: [ MocksModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitBusinessRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
