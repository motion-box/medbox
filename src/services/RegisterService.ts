import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {api_endpoints, BASE_URL} from './../resources/constants/index';
import {
  RegisterRequestModel,
  ConsultationRequestModel,
  ConsultationModel,
  ConsultationBodyModel,
  AnalyzesRequestModel,
  AnalyzesModel,
} from './../models/HistoryItemsModel';
import {PriceOfSpecialityModel} from '../models/DoctorModel';

interface Request<T> {
  token: string;
  id?: number;
  data: T;
}

export const registerAPI = createApi({
  reducerPath: 'registerAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Register'],
  endpoints: build => ({
    createRegister: build.mutation<any, Request<RegisterRequestModel>>({
      query: ({token, data}) => ({
        url: `/${api_endpoints.registers.REGISTERS}/`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),
    createConsultation: build.mutation<any, Request<ConsultationRequestModel>>({
      query: ({token, data}) => ({
        url: `/${api_endpoints.registers.CONSULTATION}/`,
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),
    getConsultations: build.mutation<
      Array<ConsultationModel>,
      {register: number; token: string}
    >({
      query: ({token, register}) => ({
        url: `/${api_endpoints.registers.CONSULTATION}/`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          register: register,
          ordering: '-last_updated_time',
        },
      }),
    }),
    getSpecialitiesForConsultation: build.mutation<
      Array<PriceOfSpecialityModel>,
      {
        token: string;
        params: {
          speciality: number;
          limit: number;
        };
      }
    >({
      query: ({token, params}) => ({
        url: `/${api_endpoints.doctors.GET_PRICE_OF_SPECIALITIES}/`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {...params, ordering: 'price,-doctor__rating'},
      }),
    }),
    updateConsultation: build.mutation<
      ConsultationModel,
      Request<ConsultationBodyModel>
    >({
      query: ({token, id, data}) => ({
        url: `/${api_endpoints.registers.CONSULTATION}/${id}/`,
        method: 'PATCH',
        body: {...data},
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),
    reviewConsultation: build.mutation<
      any,
      {
        token: string;
        type: 'estimates' | 'complaints';
        body: {
          consultation: number;
          user: number;
          doctor: number;
          rate?: number;
          comment?: string;
        };
      }
    >({
      query: ({token, type, body}) => ({
        url: `/${type}/`,
        method: 'POST',
        body: {...body},
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),

    getAnalyzes: build.mutation<
      Array<AnalyzesModel>,
      Request<AnalyzesRequestModel>
    >({
      query: ({token, data}) => ({
        url: `/${api_endpoints.registers.ANALYZES}/`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          ...data,
          ordering: '-last_updated_time',
        },
      }),
    }),
  }),
});
