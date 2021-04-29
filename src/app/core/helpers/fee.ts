import { Fee } from 'constants/premium.constants';

export const calculateFee = (price: number) => {
  if (price === 0) {
    return Fee.ZERO;
  }
  if (price < 8) {
    return Fee.SMALL;
  }
  return price * Fee.BIG;
}
