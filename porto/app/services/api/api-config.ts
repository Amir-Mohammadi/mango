import { AppConfig } from '../../config';

// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
export const API_URL = __DEV__ ? AppConfig.api.apiUrlDev : AppConfig.api.apiUrl;
export const DEVICE_API_URL = AppConfig.deviceConfig.apModeV1.deviceApiUrl;

/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: API_URL,
  timeout: 10000,
};

export const DEVICE_API_CONFIG: ApiConfig = {
  url: DEVICE_API_URL,
  timeout: 10000,
};
