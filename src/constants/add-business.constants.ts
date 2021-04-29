export const MAX_STEPS = 12;

export const MINUTES_IN_HOUR = 60;
export const HUNDRED_MILES = 160930;
export const SERVICES_BG_COLOR = '76,189,151';
export const TRANSPORTATION_BG_COLOR = '179,126,255';
export const GOODS_BG_COLOR = '253,155,9';
export const MAX_RADIUS = 15;
export const MIN_RADIUS = 0.1;

export const ServicesSteps = {
  FIRST: {
    step: 1,
    title: 'create_new_business.what_kind_of_business',
    subtitle: 'create_new_business.select_business_category',
    iconPath: 'assets/create-business/first-step.svg',
    showStepper: true
  },
  SECOND: {
    step: 2,
    title: 'create_new_business.what_service_provide',
    subtitle: 'create_new_business.select_service_provide',
    iconPath: 'assets/create-business/second-step.svg',
    showStepper: true
  },
  THIRD: {
    step: 3,
    title: 'create_new_business.tell_about_business',
    subtitle: 'create_new_business.describe_your_about',
    iconPath: 'assets/create-business/third-step.svg',
    showStepper: true
  },
  FOURTH: {
    step: 4,
    title: 'create_new_business.business_location',
    subtitle: 'create_new_business.business_location_desc',
    iconPath: 'assets/create-business/fourth-step.svg',
    showStepper: true
  },
  FIFTH: {
    step: 5,
    title: 'create_new_business.what_your_services_list',
    subtitle: '',
    iconPath: 'assets/create-business/checklist.svg',
    showStepper: true
  },
  SIXTH: {
    step: 6,
    title: 'create_new_business.what_your_services_rate',
    subtitle: 'create_new_business.set_service_rate',
    iconPath: 'assets/create-business/money.svg',
    showStepper: true
  },
  SEVENTH: {
    step: 7,
    title: 'create_new_business.what_time_service_operate',
    subtitle: 'create_new_business.set_your_service_operational_hours',
    iconPath: 'assets/create-business/time.svg',
    showStepper: true
  },
  EIGHTH: {
    step: 8,
    title: 'create_new_business.want_to_add_photo_of_service',
    subtitle: 'create_new_business.add_photo_of_work_to_attract',
    iconPath: 'assets/create-business/camera.svg',
    showStepper: true
  },
  NINTH: {
    step: 9,
    title: 'create_new_business.add_payment_method',
    subtitle: 'create_new_business.add_payment_method_to_get_paid',
    iconPath: 'assets/create-business/credit-card.svg',
    showStepper: true
  },
  TENTH: {
    step: 10,
    title: 'create_new_business.add_faqs',
    subtitle: 'create_new_business.faqs_can_help',
    iconPath: 'assets/create-business/help.svg',
    showStepper: true
  },
  ELEVENTH: {
    step: 11,
    title: 'create_new_business.do_u_have_services_rule',
    subtitle: 'create_new_business.add_rules_about_service',
    iconPath: 'assets/create-business/info.svg',
    showStepper: true
  },
  TWELFTH: {
    step: 12,
    title: 'create_new_business.want_to_add_team_member',
    subtitle: 'create_new_business.add_team_member_who_can_help',
    iconPath: 'assets/icon/user.svg',
    showStepper: true
  },
  THIRTEENTH: {
    step: 13,
    title: '',
    showStepper: false
  },
  FOURTEENTH: {
    step: 14,
    title: 'create_new_business.ready_to_publish_business',
    showStepper: false,
  }
};

export const OfferSteps = {
  FIRST: {
    step: 1,
    title: 'create_new_offer.kind_of_offer',
    subtitle: 'create_new_offer.describe_offer',
    iconPath: 'assets/create-business/third-step.svg',
    showStepper: true
  },
  SECOND: {
    step: 2,
    title: 'create_new_business.what_service_provide',
    subtitle: 'create_new_business.select_service_provide',
    iconPath: 'assets/create-business/second-step.svg',
    showStepper: true
  },
  THIRD: {
    step: 3,
    title: 'create_new_offer.ready_to_publish_offer',
    subtitle: 'create_new_business.describe_your_about',
    iconPath: 'assets/create-business/third-step.svg',
    showStepper: true
  },
  FOURTH: {
    step: 4,
    title: 'create_new_business.business_location',
    subtitle: 'create_new_business.business_location_desc',
    iconPath: 'assets/create-business/fourth-step.svg',
    showStepper: true
  },
};

export const ListOfServices = [
  {
    name: 'tutor',
    title: 'create_new_business.services_types.tutor',
    description: 'create_new_business.services_types.tutor_desc',
    iconPath: 'assets/services/tutor.svg',
    selected: false
  },
  {
    name: 'laundry',
    title: 'create_new_business.services_types.laundry',
    description: 'create_new_business.services_types.laundry_desc',
    iconPath: 'assets/services/laundry.svg',
    selected: false
  },
  {
    name: 'clean',
    title: 'create_new_business.services_types.clean',
    description: 'create_new_business.services_types.clean_desc',
    iconPath: 'assets/services/clean.svg',
    selected: false
  },
  {
    name: 'study support',
    title: 'create_new_business.services_types.study_support',
    description: 'create_new_business.services_types.study_support_desc',
    iconPath: 'assets/services/study-support.svg',
    selected: false
  },
  {
    name: 'handyman',
    title: 'create_new_business.services_types.handyman',
    description: 'create_new_business.services_types.handyman_desc',
    iconPath: 'assets/services/handyman.svg',
    selected: false
  },
  {
    name: 'beauty',
    title: 'create_new_business.services_types.beauty',
    description: 'create_new_business.services_types.beauty_desc',
    iconPath: 'assets/services/beauty.svg',
    selected: false
  },
  {
    name: 'other',
    title: 'create_new_business.services_types.other',
    description: 'create_new_business.services_types.other_desc',
    iconPath: 'assets/services/others.svg',
    selected: false
  },
];

export const ListOfOfferServices = [
  {
    name: 'Tutor',
    title: 'create_new_business.services_types.tutor',
    description: 'create_new_business.services_types.tutor_desc',
    iconPath: 'assets/services/tutor-glyph.svg',
    selected: false
  },
  {
    name: 'Laundry',
    title: 'create_new_business.services_types.laundry',
    description: 'create_new_business.services_types.laundry_desc',
    iconPath: 'assets/services/laundry-glyph.svg',
    selected: false
  },
  {
    name: 'Clean',
    title: 'create_new_business.services_types.clean',
    description: 'create_new_business.services_types.clean_desc',
    iconPath: 'assets/services/clean-glyph.svg',
    selected: false
  },
  {
    name: 'Study support',
    title: 'create_new_business.services_types.study_support',
    description: 'create_new_business.services_types.study_support_desc',
    iconPath: 'assets/services/study-glyph.svg',
    selected: false
  },
  {
    name: 'Handyman',
    title: 'create_new_business.services_types.handyman',
    description: 'create_new_business.services_types.handyman_desc',
    iconPath: 'assets/services/handyman-glyph.svg',
    selected: false
  },
  {
    name: 'Beauty',
    title: 'create_new_business.services_types.beauty',
    description: 'create_new_business.services_types.beauty_desc',
    iconPath: 'assets/services/beauty-glyph.svg',
    selected: false
  },
  {
    name: 'Other',
    title: 'create_new_business.services_types.other',
    description: 'create_new_business.services_types.other_desc',
    iconPath: 'assets/services/other-glyph.svg',
    selected: false
  },
];

export const BusinessTypes = [
  {
    title: 'create_new_business.let_add_business',
    img: 'assets/icon/business.png',
    url: '/tabs/business/add/1'
  },
  {
    title: 'create_new_business.got_one_time_service',
    img: 'assets/icon/offer.png',
    url: '/tabs/business/add/offer/1'
  }
];

export enum BusinessPreviewTabs {
  Services = 0,
  About = 1,
  FAQ = 2,
}

export enum BusinessPreviewTabsNoFaq {
  Services = 0,
  About = 1,
}

export enum BusinessDetailsTabs {
  Services = 0,
  // Reviews = 1,
  About = 2,
  FAQ = 3,
}

export enum BusinessDetailsTabsNoFaq {
  Services = 0,
  // Reviews = 1,
  About = 2,
}
