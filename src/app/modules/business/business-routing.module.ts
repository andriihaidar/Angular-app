import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessDetailsPage } from './pages/business-details/business-details.page';

export const BusinessRoutes: Routes = [
  {
    path: '',
    component: BusinessDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(BusinessRoutes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}
