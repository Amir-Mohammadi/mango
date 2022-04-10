import parsePhoneNumberFromString from 'libphonenumber-js';

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'IR');

  return !!parsedPhoneNumber?.isValid();
};

/**
 * format the phone number to a unified format
 * @returns phone number "+98 9** *** ****"
 */
export const getPhoneNumberUri = (phoneNumber: string): string | undefined => {
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'IR');

  return parsedPhoneNumber ? String(parsedPhoneNumber.number) : undefined;
};
