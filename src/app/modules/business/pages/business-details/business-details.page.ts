import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/models/store.interface';
import { BusinessActions } from 'src/app/core/store/business';
import { Subscription, BehaviorSubject } from 'rxjs';
import { selectBusinessData, selectIsDeletedBusiness } from 'src/app/core/store/business/business.selectors';
import { BusinessDTO, FaqDTO, Service, ScheduleDTO, TeamMemberDTO, BusinessLocation } from '@app/core/models/business';
import { AddBusinessConstants } from 'constants/index';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { DatepickerModalComponent } from '../../components/datepicker-modal/datepicker-modal.component';
import { selectRequestsData } from 'src/app/core/store/requests/requests.selectors';
import { RequestsActions } from 'src/app/core/store/requests';
import { DEFAULT_BUSINESS_DETAILS_IMAGE, DEFAULT_USER_IMAGE, ServiceStatuses } from 'constants/components.constants';
import { ShareOptions, Plugins } from '@capacitor/core';
import { BusinessMenuComponent } from '../../components/business-menu/business-menu.component';
import { selectAccountData } from 'src/app/core/store/account/account.selectors';
import { User } from '@app/core/models/user';
import { filledSteps } from 'src/app/core/helpers/canPublish';
import { CreateBusinessActions } from 'src/app/core/store/create-business';
const { Share } = Plugins;

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.page.html',
  styleUrls: ['./business-details.page.scss']
})
export class BusinessDetailsPage implements OnInit, OnDestroy {
  readonly subscriptions: Subscription[] = [];
  readonly defaultUserImage = DEFAULT_USER_IMAGE;
  readonly defaultBusinessDetailsImage = DEFAULT_BUSINESS_DETAILS_IMAGE;

  currentTab = AddBusinessConstants.BusinessDetailsTabs.Services;
  user$: BehaviorSubject<User> = new BehaviorSubject({} as User);
  faq: FaqDTO[];
  servicesList: Service[];
  scheduleList: ScheduleDTO[];
  requestedService: Service[] = [];
  teamMembers: TeamMemberDTO[] = [];
  business: BusinessDTO;
  location: BusinessLocation;
  isImageFullscreen: boolean;
  businessId: string;
  paymentEmail: string;
  businessDetailsTabs;
  modal;
  refresher;
  neededForPublishSteps;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public modalController: ModalController,
    private navController: NavController,
    private router: Router,
    private alertController: AlertController
  ) {
    this.businessId = this.route.snapshot.params.businessId;
  }

  ngOnInit(): void {
    this.getFullBusinessData();
    this.selectDataFromStore();
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.store.dispatch(RequestsActions.cleanRequest());
      }
    })
  }

  getFullBusinessData() {
    this.store.dispatch(BusinessActions.getBusinessById.request({ id: this.businessId }));
    this.store.dispatch(BusinessActions.getFaqByBusinessId.request({ id: this.businessId }));
    this.store.dispatch(BusinessActions.getServicesByBusinessId.request({ id: this.businessId }));
    this.store.dispatch(BusinessActions.getTeamMembersByBusinessId.request({ businessId: this.businessId }));
    this.store.dispatch(BusinessActions.getPaymentEmail.request({ businessId: this.businessId }));
  }

  selectDataFromStore() {
    this.subscriptions[0] = this.store.select(selectBusinessData)
      .subscribe((data) => {
        if (data) {
          this.faq = data.faq;
          this.servicesList = data.servicesList;
          this.business = data.selectedBusiness;
          this.scheduleList = data.scheduleList;
          this.teamMembers = data.teamMembersList;
          this.paymentEmail = data.paymentEmail;
          this.location = {
            locationLatitude: data.selectedBusiness.locationLatitude,
            locationLongitude: data.selectedBusiness.locationLongitude,
            radius: data.selectedBusiness.radius,
            address: data.selectedBusiness.address,
          }
          if (this.faq.length) {
            this.businessDetailsTabs =  AddBusinessConstants.BusinessDetailsTabs;
          } else {
            this.businessDetailsTabs = AddBusinessConstants.BusinessDetailsTabsNoFaq;
          }
          if (this.refresher) {
            this.refresher.target.complete();
          }
          this.neededForPublishSteps = filledSteps(this.business, this.scheduleList, this.servicesList, this.paymentEmail);
        }
      })

    this.subscriptions[1] = this.store.select(selectRequestsData)
      .subscribe((data) => {
        if (data && data.isCreatedRequest) {
          this.modal.dismiss();
        }
      })

    this.subscriptions[2] = this.store.select(selectAccountData).subscribe((data) => {
      if (data && data.user) {
        this.user$.next(data.user);
      }
    });

    this.subscriptions[3] = this.store.select(selectIsDeletedBusiness)
      .subscribe((data: boolean) => {
        if (data) {
          this.modalController.dismiss()
          this.navController.navigateBack('tabs/business');
        }
      })
  }

  toggleFullScreen(isImageFullscreen: boolean) {
    this.isImageFullscreen = isImageFullscreen;
  }

  back = () => {
    this.navController.navigateBack('tabs/business');
  }

  changeTab(tab: string) {
    this.currentTab = this.businessDetailsTabs[tab];
  }

  toggleService(service) {
    const index = this.requestedService.findIndex((item) => item.serviceName === service.serviceName);
    if (index >= 0) {
      this.requestedService.splice(index, 1);
    } else {
      this.requestedService.push(service);
    }
  }

  async showDatepickerModal() {
    this.modal = await this.modalController.create({
      component: DatepickerModalComponent,
      swipeToClose: true,
      animated: false,
      componentProps: {
        schedule: this.scheduleList,
        services: {
          total: this.totalSum,
          list: this.requestedService,
        },
        business: this.business,
      }
    });
    return await this.modal.present();
  }

  async shareBusiness() {
    const options: ShareOptions = {
      title: this.business.businessName,
      text: `Check out my business on Name of app: ${this.business.businessName} https://Name of app.us/tabs/business/${this.business._id}`,
      url: `https://Name of app.us/tabs/business/${this.business._id}`,
      dialogTitle: 'Share with buddies'
    };
    try {
      await Share.share(options);
    } catch(e) {
      console.log(e)
    }
  }

  async presentMenuModal() {
    const modal = await this.modalController.create({
      component: BusinessMenuComponent,
      swipeToClose: true,
      cssClass: this.isDraft ? 'small-modal' : 'half-modal',
      componentProps: {
        businessId: this.business._id,
        businessStatus: this.business.status
      }
    });
    return await modal.present();
  }

  doRefresh(event) {
    this.refresher = event;
    this.getFullBusinessData();
  }

  toggleServiceItem(service: Service) {
    this.store.dispatch(BusinessActions.toggleAvailabilityService.request({ service: { ...service} }))
  }

  publishBusiness() {
    const undoneSteps = [];
    this.neededForPublishSteps.filter((step) => !step.done).map((step) => {
      undoneSteps.push(step.title);
    });
    if (undoneSteps.length) {
      this.presentWarningPopup(undoneSteps);
    } else {
      this.store.dispatch(CreateBusinessActions.updateBusiness.request({
        business: this.business,
        status: { status: ServiceStatuses.PUBLISHED },
        id: this.business._id,
        updateFromDraft: true
      }));
    }
  }

  async presentWarningPopup(undoneSteps) {
    const alert = await this.alertController.create({
      header: 'You cannot publish this business',
      message: `Before publishing the business you must fill the next steps: ${undoneSteps.join(', ')}`
    });
    await alert.present();
  }

  get totalSum() {
    return this.requestedService.reduce((sum, service) => sum + Number(service.serviceRate), 0)
  }

  get serviceType(): string {
    return this.business?.serviceToProvide
      && this.business?.serviceToProvide[0]
      && this.business?.serviceToProvide[0].replace(' ', '_');
  }

  get isOwner(): boolean {
    return this.user$.value._id === this.business?.user?._id;
  }

  get status(): string {
    return this.business?.status;
  }

  get translateStatus(): string {
    return `business.${this.status}`;
  }

  get isPublished(): boolean {
    return this.status === ServiceStatuses.PUBLISHED;
  }

  get isDraft(): boolean {
    return this.status === ServiceStatuses.DRAFT;
  }

  get isClosed(): boolean {
    return this.status === ServiceStatuses.CLOSED;
  }

  get statusText(): string {
    return this.isClosed ? 'business.your_business_closed' : 'business.your_business_opened';
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
