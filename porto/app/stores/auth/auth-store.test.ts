import { AuthStoreModel } from './auth-store';

describe('auth store', () => {
  test('can be created', () => {
    const instance = AuthStoreModel.create({});

    expect(instance).toBeTruthy();
  });
});
