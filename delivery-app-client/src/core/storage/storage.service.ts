import EncryptedStorage from 'react-native-encrypted-storage';

export class StorageService {
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  async setToken(refreshToken: string): Promise<void> {
    await EncryptedStorage.setItem(
      this.REFRESH_TOKEN_KEY,
      JSON.stringify({ refreshToken }),
    );
  }

  async removeTokens(): Promise<void> {
    await EncryptedStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  async getRefreshToken(): Promise<string | null> {
    const value = await EncryptedStorage.getItem(this.REFRESH_TOKEN_KEY);

    if (!value) {
      return null;
    }

    return JSON.parse(value)[this.REFRESH_TOKEN_KEY];
  }
}

export const storageService = new StorageService();
