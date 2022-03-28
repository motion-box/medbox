export const BASE_URL = 'https://medbox.uz/api/';
export const api_endpoints = {
  users: {
    USERS: 'users',
    GET_QR_CODE: 'get_qr_code',
  },
  doctors: {
    DOCTORS: 'doctors',
    GET_PRICE_OF_SPECIALITIES: 'price-of-specialities',
    GET_WORKING_SCHEDULE: 'working-schedules',
    ESTIMATES: 'estimates',
    COMPLAINTS: 'complaints',
  },
  classifiers: {
    SPECIALITIES: 'specialities',
    HOUR_INTERVALS: 'hour-intervals',
  },
  registers: {
    REGISTERS: 'registers',
    CONSULTATION: 'consultations',
    ANALYZES: 'analyzes',
    RECIPES: 'recipes',
    PHOTO_OF_RESULTS: 'photo-of-result',
  },

  signup_step: {
    SIGN_UP: 'register',
    SEND_SMS_ON_REGISTER: 'send-sms-code-on-register',
    CHECK_SMS_ON_REGISTER: 'check-sms-code-on-register',
  },
  signin_step: {
    SIGN_IN: 'login-for-user',
  },
  restore_step: {
    RESTORE: 'restore',
    SEND_SMS_ON_RESTORE: 'send-sms-code-on-restore',
    CHECK_SMS_ON_RESTORE: 'check-sms-code-on-restore',
  },
  news: {
    NEWS: 'news',
  },
};
