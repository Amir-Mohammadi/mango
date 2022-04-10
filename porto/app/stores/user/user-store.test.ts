import { UserStoreModel } from './user-store';

describe('auth store', () => {
  test('can be created', () => {
    const instance = UserStoreModel.create({});

    expect(instance).toBeTruthy();
  });
});
