import AsyncStorage from '@react-native-async-storage/async-storage';

export class Storage {
  /**
   * Loads a string from storage.
   *
   * @param key The key to fetch.
   */
  static async loadString(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      // not sure why this would fail... even reading the RN docs I'm unclear
      return null;
    }
  }

  /**
   * Saves a string to storage.
   *
   * @param key The key to fetch.
   * @param value The value to store.
   */
  static async saveString(key: string, value: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Loads something from storage and runs it thru JSON.parse.
   *
   * @param key The key to fetch.
   */
  static async load<T = any>(key: string): Promise<T | null> {
    try {
      const almostThere = await AsyncStorage.getItem(key);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return JSON.parse(almostThere!) as T;
    } catch {
      return null;
    }
  }

  /**
   * Saves an object to storage.
   *
   * @param key The key to fetch.
   * @param value The value to store.
   */
  static async save(key: string, value: any): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Removes something from storage.
   *
   * @param key The key to kill.
   */
  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {}
  }

  /**
   * Burn it all to the ground.
   */
  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch {}
  }
}
