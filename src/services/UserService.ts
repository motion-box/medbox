import {UserOveralModel} from './../models/UserModal';
import {api_endpoints, BASE_URL} from './../resources/constants/index';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface RegisterType extends UserOveralModel, SessionType {}

type SessionType = {
  token: string;
  refresh_token: string;
  expire_time: string;
};

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
  tagTypes: ['User'],
  endpoints: build => ({
    sendSmsOnRegister: build.mutation({
      query: user => ({
        url: `/${api_endpoints.signup_step.SEND_SMS_ON_REGISTER}/`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    checkSmsOnRegister: build.mutation({
      query: user => ({
        url: `/${api_endpoints.signup_step.CHECK_SMS_ON_REGISTER}/`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    register: build.mutation({
      query: user => ({
        url: `/${api_endpoints.signup_step.SIGN_UP}/`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    login: build.mutation({
      query: user => ({
        url: `/${api_endpoints.signin_step.SIGN_IN}/`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    sendSmsOnRestore: build.mutation({
      query: user => ({
        url: `/${api_endpoints.restore_step.SEND_SMS_ON_RESTORE}/`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    checkSmsOnRestore: build.mutation({
      query: user => ({
        url: `/${api_endpoints.restore_step.CHECK_SMS_ON_RESTORE}/`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    restore: build.mutation({
      query: user => ({
        url: `/${api_endpoints.restore_step.RESTORE}/`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});
