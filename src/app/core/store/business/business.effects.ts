import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as businessActions from './business.actions'
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BusinessService } from 'src/app/modules/business/services/business.service';
import { CreateBusinessService } from 'src/app/modules/create-business/services/create-business.service';
import { NavController } from '@ionic/angular';
import { Service, ScheduleDTO, TeamMemberDTO } from '@app/core/models/business';
import { NavigationConstants } from 'constants/index';
import { PhotoService } from '../../services/photo.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/store.interface';
import * as  CreateBusinessActions from '../create-business/create-business.actions';
import { PhotoTypes } from 'constants/components.constants';

@Injectable()
export class BusinessEffects {
  readonly navigationStepName = NavigationConstants.StepsNames;

  constructor(
    private actions$: Actions,
    private businessService: BusinessService,
    private createBusinessService: CreateBusinessService,
    private navCtrl: NavController,
    private photoService: PhotoService,
    private store: Store<AppState>
  ) { }

  getMyBusinesses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.getMyBusinesses.request),
      switchMap((() =>
        this.businessService.getMyBusinesses().pipe(
          map(({ data } ) => {
            return businessActions.getMyBusinesses.success({ businessList: data.businesses })
          }),
          catchError(({ error }) => of(businessActions.getMyBusinesses.failure({ error })))
        )
      ))
    )
  );

  getOffers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(businessActions.getOffers.request),
    switchMap((() =>
      this.businessService.getOffers().pipe(
        map((offersList) => {
          return businessActions.getOffers.success({ offersList });
        }),
        catchError(({ error }) => of(businessActions.getOffers.failure({ error })))
      )
    ))
  )
);

  getMyOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.getMyOffers.request),
      switchMap((() =>
        this.businessService.getMyOffers().pipe(
          map((offersList) => {
            return businessActions.getMyOffers.success({ offersList });
          }),
          catchError(({ error }) => of(businessActions.getMyOffers.failure({ error })))
        )
      ))
    )
  );

  getBusinessById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.getBusinessById.request),
      switchMap(({ id }) =>
        this.businessService.getBusinessById(id).pipe(
          map(({ data }) =>  businessActions.getBusinessById.success({ selectedBusiness: data.business })),
          catchError(({ error }) => of(businessActions.getBusinessById.failure({ error })))
        )
      )
    )
  );

  getOfferById$ = createEffect(() =>
  this.actions$.pipe(
    ofType(businessActions.getOfferById.request),
    switchMap(({ id }) =>
      this.businessService.getOfferById(id).pipe(
        map((selectedOffer) => businessActions.getOfferById.success({ selectedOffer })),
        catchError(({ error }) => of(businessActions.getOfferById.failure({ error })))
      )
    )
  )
);

  getFaqByBusinessId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.getFaqByBusinessId.request),
      switchMap(({ id }) =>
        this.businessService.getFAQByBusinessId(id).pipe(
          map(({ data }) => businessActions.getFaqByBusinessId.success({ faq: data.faqs })),
          catchError(({ error }) => of(businessActions.getFaqByBusinessId.failure({ error })))
        )
      )
    )
  );

  getServicesByBusinessId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.getServicesByBusinessId.request),
      switchMap(({ id }) =>
        this.businessService.getServicesByBusinessId(id).pipe(
          map(({
            servicesList,
            scheduleList,
            serviceDuration,
            serviceRateType,
            _id
          }) => businessActions.getServicesByBusinessId
            .success({
              servicesList,
              scheduleList,
              serviceDuration,
              serviceRateType,
              serviceId: _id,
            })),
          catchError(({ error }) => of(businessActions.getServicesByBusinessId.failure({ error })))
        )
      )
    )
  );

  getTeamMembersByBusinessId = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.getTeamMembersByBusinessId.request),
      switchMap((({ businessId }) =>
        this.businessService.getTeamMembersByBusinessId(businessId).pipe(
          map(({ data }) => businessActions.getTeamMembersByBusinessId.success({ teamMembersList: data.teamMembers })),
          catchError(({ error }) => of(businessActions.getTeamMembersByBusinessId.failure({ error })))
        )
      ))
    )
  );

  getTimeSlotByDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.getTimeSlotsByDate.request),
      switchMap((({ businessId, date }) =>
        this.businessService.getTimeSlotsByDate(businessId, date).pipe(
          map(( slots ) => businessActions.getTimeSlotsByDate.success({ slots })),
          catchError(({ error }) => of(businessActions.getTimeSlotsByDate.failure({ error })))
        )
      ))
    )
  );

  getPaymentEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.getPaymentEmail.request),
      switchMap(({ businessId }) => this.createBusinessService.getPaymentEmail(businessId).pipe(
        map((email) => businessActions.getPaymentEmail.success({ email }))
      ))
    )
  );

  editServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.editServices.request),
      switchMap(({ businessId, params, redirectUrl }) => this.businessService.editServices(businessId, params).pipe(
        map((servicesList: Service[]) => {
          this.navCtrl.navigateForward(redirectUrl);
          return businessActions.editServices.success({ servicesList })
        })
      ))
    )
  );

  editSchedule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.editSchedule.request),
      switchMap((({ params, businessId }) => this.businessService.editSchedules(businessId, params).pipe(
        map((scheduleList: ScheduleDTO[]) => {
          this.navCtrl.back();
          return businessActions.editSchedule.success({ scheduleList })
        })
      )))
    )
  );

  toggleAvailabilityService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.toggleAvailabilityService.request),
      switchMap(({service }) => this.businessService.toggleAvailabilityService(service).pipe(
        map(() => businessActions.toggleAvailabilityService.success({ }))
      ))
    )
  );

  deleteBusiness$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.deleteBusiness.request),
      switchMap(({ businessId, password }) => this.businessService.deleteBusiness(businessId, password).pipe(
        map(() => {
          if (!password.length) {
            this.createBusinessService.businessId = null;
            this.createBusinessService.backToBusinessMainPage();
          }
          return businessActions.deleteBusiness.success({ businessId });
        })
      ))
    )
  );

  toggleBusinessStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.toggleBusinessStatus.request),
      switchMap(({ businessId, updatedStatus }) => this.businessService.toggleBusinessStatus(businessId).pipe(
        map(() => {
          this.createBusinessService.dismissModal();
          return businessActions.updateBusinessStatus({ status: updatedStatus });
        })
      ))
    )
  );


  updateBusinessProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.updateBusinessProfile.request),
      switchMap(({ params, businessId, isEdit, updatePhoto }) => this.createBusinessService.updateBusiness(params, businessId).pipe(
        map((data) => {
          if (updatePhoto) {
            this.updateBusinessPhoto(businessId);
          }
          this.store.dispatch(CreateBusinessActions.getServiceSamples.request({ businessId }));
          this.photoService.deleteUploadedPhoto('', '', PhotoTypes.COVER)
          isEdit
            ? this.navCtrl.back()
            : this.createBusinessService.goToNextStep(this.navigationStepName.fourth);;
          return businessActions.updateBusinessProfile.success({ params: data });
        }),
      )
    ))
  );

  updateLocation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.updateLocation.request),
      switchMap(({ params, businessId, isSave, isEdit }) => this.createBusinessService.updateBusiness(params, businessId).pipe(
        map((data) => {
          if (isSave) {
            this.createBusinessService.backToBusinessMainPage();
          } else if (isEdit) {
            this.navCtrl.back();
          } else {
            this.createBusinessService.goToNextStep(this.navigationStepName.fifth);
          }
          return businessActions.updateLocation.success({ params: data })
        }),
      )
    ))
  );

  updateFaq$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.updateFaq.request),
      switchMap(({ faq, isEdit }) => this.businessService.updateFaq(faq).pipe(
        map((data) => {
          isEdit
            ? this.navCtrl.back()
            : this.createBusinessService.goToNextStep(this.navigationStepName.eleventh);
          return businessActions.updateFaq.success({ faq: data });
        })
      ))
    )
  );

  updateRules$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.updateRules.request),
      switchMap(({ rules, businessId }) => this.businessService.updateRules(rules, businessId).pipe(
        map((data) => {
          this.navCtrl.back();
          return businessActions.updateRules.success({ rules: data })
        }),
      ))
    )
  );

  updateTeamMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.updateTeamMembers.request),
      switchMap(({ teamMembers }) => this.businessService.updateTeamMembers(teamMembers).pipe(
        map(( members: TeamMemberDTO[]) => {
          this.navCtrl.back();
          return businessActions.updateTeamMembers.success({ teamMembers: members })
        })
      ))
    )
  );

  private updateBusinessPhoto = (businessId: string) => {
    const image = new FormData();
    const photo = this.photoService.coverPhoto$.value;
    const filename = `${photo.filepath}.${photo.format}`;
    image.append('file', new Blob([photo.blob]), filename);
    this.store.dispatch(CreateBusinessActions.uploadBusinessPhoto.request({
      id: businessId,
      image
    }));
  }
}
