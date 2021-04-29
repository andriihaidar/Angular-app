import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './business.reducers';
import { BusinessEffects } from './business.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('business', reducer),
    EffectsModule.forFeature([BusinessEffects]),
  ],
  providers: [BusinessEffects],
})
export class BusinessModule {}
