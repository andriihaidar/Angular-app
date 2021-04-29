import { NgModule } from '@angular/core';

// libs
import { KirschUndKernIonicCoreModule } from '@app/ionic';
import { RootStoreModule } from './store';

@NgModule({
  imports: [
    KirschUndKernIonicCoreModule,
    RootStoreModule
  ],
})
export class CoreModule {}
