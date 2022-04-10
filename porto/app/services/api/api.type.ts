import * as ApiSauce from 'apisauce';
import { Platform } from 'react-native';
import RNRestart from 'react-native-restart';
import { showAndroidToast } from '../../utils/toast';
import { TokenManager } from '../../utils/token/token-manager';
import { ApiErrors } from './api.errors';

export type ApiResponse<T> =
  | {
      kind: 'ok';
      data: T;
    }
  | GeneralApiProblem;

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: 'timeout'; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: 'cannot-connect'; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: 'server' }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: 'unauthorized' }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: 'forbidden' }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: 'not-found' }
  /**
   * All other 4xx series errors.
   */
  | { kind: 'rejected' }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: 'unknown'; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: 'bad-data' };

function transformRawApiError(
  response: ApiSauce.ApiResponse<any>,
): GeneralApiProblem | null {
  switch (response.problem) {
    case 'CONNECTION_ERROR':
      return { kind: 'cannot-connect', temporary: true };
    case 'NETWORK_ERROR':
      return { kind: 'cannot-connect', temporary: true };
    case 'TIMEOUT_ERROR':
      return { kind: 'timeout', temporary: true };
    case 'SERVER_ERROR':
      return { kind: 'server' };
    case 'UNKNOWN_ERROR':
      return { kind: 'unknown', temporary: true };
    case 'CLIENT_ERROR':
      switch (response.status) {
        // TODO uncommite after server http codes fixed
        // case 401:
        //   return { kind: 'unauthorized' };

        // case 403:
        //   return { kind: 'forbidden' };

        // case 404:
        //   return { kind: 'not-found' };

        default:
          return { kind: 'rejected' };
      }
    default:
      return null;
  }
}

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(
  response: ApiSauce.ApiResponse<any>,
): GeneralApiProblem | null {
  const error = transformRawApiError(response);

  if (
    error?.kind === 'rejected' &&
    response.data.code === ApiErrors.INVALID_TOKEN
  ) {
    // for some special errors, like invalid token, we logout user
    TokenManager.clear();
    // and reload program to apply the changes
    // FIXME maybe there is a better way to do this
    RNRestart.Restart();
    return null;
  }

  console.error('api error: ', response);
  console.tron?.error?.('Api Error: ' + String(error?.kind), response);

  showApiErrorToUser(String(error?.kind) + ' error');

  return error;
}

function showApiErrorToUser(message: string): void {
  if (Platform.OS === 'android') {
    showAndroidToast(message);
  } else {
    // TODO after adding the IOS support
  }
}
