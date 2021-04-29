import { BusinessDTO, ScheduleDTO, Service } from '@app/core/models/business';
import { EditBusinessConstants } from 'constants/index';

export const filledSteps = (
  business: BusinessDTO,
  schedule: ScheduleDTO[],
  serviceList: Service[],
  paymentEmail: string,
) => {
  const neededForPublishSteps = EditBusinessConstants.NeededForPublishSteps;

  return neededForPublishSteps.map((item) => {

    if (item.field === 'schedule') {
      return { ...item, done: Boolean(schedule && schedule.length) };
    };

    if (item.field === 'service list') {
      return { ...item, done: serviceList.length && serviceList.every(({ serviceRate }) => Boolean(serviceRate)) };
    };

    if (item.field === 'paymentEmail') {
      return { ...item, done: Boolean(paymentEmail)}
    }

    return { ...item, done: Boolean(business[item.field]) };

  })
}
