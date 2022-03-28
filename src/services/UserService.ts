import {RegisterModel} from './../models/HistoryItemsModel';
import {UserModel} from './../models/UserModal';
import {api_endpoints, BASE_URL} from './../resources/constants/index';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface AuthorizeModel {
  token: string;
  refresh_token: string;
  expire_time: string;
  user: UserModel;
}
type MethoodTypes = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
enum Content {
  formData = 'multipart/form-data',
  json = 'application/json',
}
type ContentType = 'formData' | 'json';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
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
    register: build.mutation<AuthorizeModel, any>({
      query: user => ({
        url: `/${api_endpoints.signup_step.SIGN_UP}/`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    login: build.mutation<AuthorizeModel, any>({
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
    getUserData: build.mutation<UserModel, {id: number; token: string}>({
      query: user => ({
        method: 'GET',
        url: `/${api_endpoints.users.USERS}/${user.id}/`,
        headers: {
          Authorization: `Token ${user.token}`,
        },
      }),
    }),
    changeUserData: build.mutation<
      UserModel,
      {
        id: number;
        token: string;
        methood: MethoodTypes;
        body: any;
        conentType?: ContentType;
      }
    >({
      query: data => ({
        url: `/${api_endpoints.users.USERS}/${data.id}/`,
        method: data.methood,
        body: data.body,
        headers: {
          Authorization: `Token ${data.token}`,
          'Content-Type': Content[data.conentType || 'json'],
        },
      }),
    }),
    getUserRegisters: build.mutation<
      Array<RegisterModel>,
      {token: string; userId: number; search?: string}
    >({
      query: ({token, userId, search}) => {
        return {
          url: `/${api_endpoints.registers.REGISTERS}/`,
          method: 'GET',
          headers: {
            Authorization: `Token ${token}`,
          },
          params: {
            id: userId,
            search: search,
          },
        };
      },
    }),
    getQrCode: build.mutation<{code: string}, string>({
      query: token => ({
        url: `/${api_endpoints.users.USERS}/${api_endpoints.users.GET_QR_CODE}/`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),
  }),
});
