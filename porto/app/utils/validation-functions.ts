import { Validate } from 'react-hook-form';
import { ValidationResult } from '../components/validation-input/validation-input';

const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const phoneRegex = /^(0|0098|\+98)9(0[1-5]|[1 3]\d|2[0-2]|98)\d{7}$/;
const createResult = (): ValidationResult => {
  return { isValid: true, validationMessage: '' };
};

export const requiredValidation = (value: string): ValidationResult => {
  const result = createResult();
  if (value.trim().length === 0) {
    result.isValid = false;
    result.validationMessage = 'پر کردن این فیلد الزامی می باشد.';
  }
  return result;
};

export const emailValidation = (value: string): ValidationResult => {
  const result = createResult();
  if (!emailRegex.test(value.toLowerCase())) {
    result.isValid = false;
    result.validationMessage = 'آدرس ایمیل معتبر نمی باشد';
  }
  return result;
};

export const nameValidation = (value: string): ValidationResult => {
  const result = createResult();
  if (value.length === 0) {
    result.isValid = false;
    result.validationMessage = 'ورودی حداقل باید یک کارکتر باشد';
  }
  return result;
};

export const phoneValidationArchive = (value: string): ValidationResult => {
  const result = createResult();
  if (!phoneRegex.test(value)) {
    result.isValid = false;
    result.validationMessage = 'شماره تلفن معتبر نمی باشد';
  }
  return result;
};

export const phoneValidation: Validate<string> = (value: string) => {
  if (!phoneRegex.test(value)) {
    return 'شماره تلفن معتبر نمی باشد';
  }
  return true;
};