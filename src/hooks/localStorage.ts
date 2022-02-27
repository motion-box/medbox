import EncryptedStorage from 'react-native-encrypted-storage';

enum status {
  success = 'success',
  empty = 'empty',
  error = 'error',
}

type langs = 'en' | 'ru' | 'uz';
export const storeSecureData = async (data: any, language: langs) => {
  try {
    await EncryptedStorage.setItem(
      'session_data',
      JSON.stringify({
        token: data.token,
        refresh_token: data.refresh_token,
        expire_time: data.expire_time,
        language: language,
      }),
    );
    return status.success;
  } catch (error) {
    return status.error;
  }
};

export const getSecureData = async () => {
  try {
    const session = await EncryptedStorage.getItem('session_data');
    if (session !== undefined && session !== null) {
      return {status: status.success, data: JSON.parse(session!)};
    } else {
      return {status: status.empty};
    }
  } catch (error) {
    return {status: status.error};
  }
};

export const clearAllSecureData = async () => {
  try {
    await EncryptedStorage.clear();
    return status.success;
  } catch (error) {
    return status.error;
  }
};
