import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import * as env from 'src/environments/environment';
import { BusinessModule } from './business';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    env.environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          maxAge: 20,
        }),
    BusinessModule,
  ],
})
export class RootStoreModule {}
