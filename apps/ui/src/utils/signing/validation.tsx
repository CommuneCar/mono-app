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

export {
  validateName,
  validateEmail,
  validatePhoneNumber,
  validatePassword,
};
