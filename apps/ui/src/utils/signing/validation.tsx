import parsePhoneNumberFromString from 'libphonenumber-js';
import { isEmpty } from 'lodash';
import validator from 'validator';

const validateName = (value: string) => {
  return isEmpty(value);
};

const validateEmail = (value: string) => {
  return !validator.isEmail(value);
};

const validatePhoneNumber = (value: string) => {
  const phone = parsePhoneNumberFromString(value, 'IL');
  return !phone || !phone.isValid();
};

const validatePassword = (value: string) => {
  return isEmpty(value);
};

const validateField = (name: string, value: string) => {
  switch (name) {
    case 'firstName':
      return validateName(value);
    case 'lastName':
      return validateName(value);
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    case 'phone':
      return validatePhoneNumber(value);
    default:
      return null;
  }

}; 

export { validateField };
