export enum ApiErrors {
  INTERNAL_SERVER_ERROR = 1000,
  ACCESS_DENIED = 1003,
  RESOURCE_NOT_FOUND = 1016,
  INVALID_TOKEN = 1022,
  THIS_USER_IS_ALTERED = 1031,
  INVALID_VERIFICATION_CODE = 1032,
  XSS_DETECT = 1049,
  API_PROTECTOR_DETECT = 1050,
  FILE_NOT_FOUND = 1051,
  CUSTOMER_MISMATCH = 1052,
  ASSET_ALREADY_SHEARD = 1053,
  ASSET_MISMATCH = 1054,
}