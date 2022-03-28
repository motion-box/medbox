import {SpecialityModel} from './../models/ClassifiersModel';
import {
  DoctorModel,
  EstimateModel,
  PriceOfSpecialityModel,
  ScheduleModel,
} from './../models/DoctorModel';
import {api_endpoints, BASE_URL} from './../resources/constants/index';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface RequestInteface {
  token: string;
  params: SearchParams;
}
export interface SearchParams {
  speciality?: number;
  rating__gte?: number;
  rating__lte?: number;
  is_online?: boolean;
  search?: string;
}
export interface ScheduleSearchParams {
  clinic: number;
  doctor: number;
  for_online: boolean;
}

export const doctorAPI = createApi({
  reducerPath: 'doctorAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Doctor'],
  endpoints: build => ({
    searchDoctor: build.mutation<
      Array<DoctorModel<SpecialityModel>>,
      RequestInteface
    >({
      query: ({token, params}) => ({
        url: `/${api_endpoints.doctors.DOCTORS}/`,
        method: 'GET',
        params: {...params},
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: ['Doctor'],
    }),
    getDoctorById: build.mutation<
      DoctorModel<SpecialityModel>,
      {token: string; id: number}
    >({
      query: ({id, token}) => ({
        url: `/${api_endpoints.doctors.DOCTORS}/${id}/`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),
    getDoctorWorkPlaces: build.mutation<
      Array<PriceOfSpecialityModel>,
      {token: string; id: number}
    >({
      query: ({token, id}) => ({
        url: `/${api_endpoints.doctors.GET_PRICE_OF_SPECIALITIES}/`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          doctor: id,
        },
      }),
    }),
    getDoctorSchedule: build.mutation<
      Array<ScheduleModel>,
      {token: string; params: ScheduleSearchParams}
    >({
      query: ({token, params}) => ({
        url: `/${api_endpoints.doctors.GET_WORKING_SCHEDULE}/`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {...params},
      }),
    }),
    getEstimates: build.mutation<
      Array<EstimateModel>,
      {
        token: string;
        doctor: number;
      }
    >({
      query: ({token, doctor}) => ({
        url: `/${api_endpoints.doctors.ESTIMATES}/`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {doctor: doctor, ordering: '-last_updated_time'},
      }),
    }),
  }),
});
