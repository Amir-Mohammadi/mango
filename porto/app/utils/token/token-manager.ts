import { Storage } from '../storage';

export const TOKEN_STORAGE_KEY = '@token';

export class TokenManager {
  public static async get(): Promise<string | null> {
    return Storage.loadString(TOKEN_STORAGE_KEY);
  }

  public static async set(token: string): Promise<void> {
    await Storage.saveString(TOKEN_STORAGE_KEY, token);
  }

  public static async clear(): Promise<void> {
    Storage.remove(TOKEN_STORAGE_KEY);
  }

  /**
   * this service will automatically refresh the token it self
   * use if u need to manually get new token
   */
  public static refreshTheToken(): void {
    // TODO
  }

  public static async setup(): Promise<void> {
    // initializer
  }
}
