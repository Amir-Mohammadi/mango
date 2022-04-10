import { Api } from '../services/api';
import { Reactotron } from '../services/reactotron';
import { TokenManager } from '../utils/token/token-manager';

let ReactotronDev: typeof Reactotron;

if (__DEV__) {
  const { Reactotron } = require('../services/reactotron');
  ReactotronDev = Reactotron;
}

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  constructor() {
    // create each service
    if (__DEV__) {
      // dev-only services
      this.reactotron = new ReactotronDev();
    }
    this.api = new Api();
  }

  async setup(): Promise<void> {
    // allow each service to setup
    if (__DEV__) {
      await this.reactotron.setup();
    }

    await TokenManager.setup();

    this.api.setup();
  }

  /**
   * Reactotron is only available in dev.
   */
  reactotron!: Reactotron;

  /**
   * Our api.
   */
  api: Api;

  tokenManager!: TokenManager;
}
