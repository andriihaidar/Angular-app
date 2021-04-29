import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessDetailsPage } from './business-details.page';
import { MocksModule } from 'src/app/core/testing/mocks.module';

describe('BusinessDetailsPage', () => {
  let component: BusinessDetailsPage;
  let fixture: ComponentFixture<BusinessDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDetailsPage ],
      imports: [ MocksModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
