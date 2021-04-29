import { QuillModule } from 'ngx-quill';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/services/auth.interceptor';
import { RegisterInterceptor } from './core/services/register.interceptor';
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { GoogleMaps } from '@ionic-native/google-maps';
import {
  ErrorsConstants,
  AddBusinessConstants,
} from 'constants/index';
import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerConfig } from './core/helpers/hammerConfig';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    BrowserModule,
    HammerModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    ChartsModule,
    QuillModule.forRoot(),
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RegisterInterceptor, multi: true },
    { provide: 'ERRORS_CONSTANTS', useValue: ErrorsConstants },
    { provide: 'ADD_BUSINESS_CONSTANTS', useValue: AddBusinessConstants },
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig },
    GoogleMaps
  ],
})
export class AppModule {}
