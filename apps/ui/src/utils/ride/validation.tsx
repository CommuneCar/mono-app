
import { isEmpty } from 'lodash';
const validateGasMoney = (value: string) => {
  return isEmpty(value) || Number(value) < 0;
};

const validateSeats = (value: string) => {
  return isEmpty(value) || !Number.isInteger(Number(value)) || Number(value) < 1;
};

const validateField = (fieldName: string, value: string) => {
  switch (fieldName) {
    case 'gasMoney':
      return validateGasMoney(value)
    case 'seats':
      return validateSeats(value);
    default:
      return null;
  }
};

export { validateField }