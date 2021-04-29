import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBusinessComponent } from './delete-business.component';
import { MocksModule } from 'src/app/core/testing/mocks.module';

describe('DeleteBusinessComponent', () => {
  let component: DeleteBusinessComponent;
  let fixture: ComponentFixture<DeleteBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBusinessComponent ],
      imports: [ MocksModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
