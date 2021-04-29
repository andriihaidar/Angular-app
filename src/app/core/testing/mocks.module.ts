import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController, IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { StoreModule, Store } from '@ngrx/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '@app/web/core/core.module';
import {
  ErrorsConstants,
  AddBusinessConstants,
} from 'constants/index';
import { BusinessRoutingModule } from '../../modules/business/business-routing.module';
import { TestStore } from './test-store';

const modalSpy = jasmine.createSpyObj('Modal', ['present']);
const modalCtrlSpy = jasmine.createSpyObj('ModalController', ['create', 'dismiss']);
modalCtrlSpy.create.and.callFake(() => modalSpy);

@NgModule({
  imports: [
    IonicModule,
    HttpClientTestingModule,
    RouterTestingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    StoreModule.forRoot({}),
    IonicStorageModule.forRoot(),
    BusinessRoutingModule
  ],
  providers: [
    { provide: 'ERRORS_CONSTANTS', useValue: ErrorsConstants },
    { provide: 'ADD_BUSINESS_CONSTANTS', useValue: AddBusinessConstants },
    { provide: ModalController, useValue: modalCtrlSpy },
    { provide: Store, useClass: TestStore }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  exports: [
    HttpClientTestingModule,
    RouterTestingModule,
    TranslateModule,
  ]
})

export class MocksModule { }
