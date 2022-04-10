import { onSnapshot } from 'mobx-state-tree';
import { Storage } from '../../utils/storage';
import { Environment } from '../environment';
import { RootStore, RootStoreModel } from './root-store';

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = 'root';

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosely couple things
 * like events between models.
 */
export async function createEnvironment(): Promise<Environment> {
  const env = new Environment();
  await env.setup();
  return env;
}

export let rootStore: RootStore;

/**
 * Setup the root state.
 */
export async function setupRootStore(): Promise<RootStore> {
  let data: any;

  // prepare the environment that will be associated with the RootStore.
  const env = await createEnvironment();
  try {
    // load data from storage
    data = (await Storage.load(ROOT_STATE_STORAGE_KEY)) || {};
    rootStore = RootStoreModel.create(data, env);
  } catch (e: any) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({}, env);

    // but please inform us what happened
    __DEV__ && console.tron?.error?.(e.message, null);
    console.error(e.message);
  }

  // check of our token is valid or not
  // const token = await TokenManager.get();
  // if (token === '' || token === null) {
  //   TokenManager.clear();
  //   rootStore.reset();
  // }

  if (__DEV__) {
    // reactotron logging
    env.reactotron.setRootStore(rootStore, data);
  }

  // track changes & save to storage
  onSnapshot(rootStore, snapshot =>
    Storage.save(ROOT_STATE_STORAGE_KEY, snapshot),
  );

  return rootStore;
}
