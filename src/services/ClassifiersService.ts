import {NewsModel, NewsRequestModel} from './../models/NewsModel';
import {api_endpoints, BASE_URL} from './../resources/constants/index';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {SpecialityModel, HourIntervalsModel} from '../models/ClassifiersModel';

interface Request<T> {
  token: string;
  params?: T;
}

export const classifiersAPI = createApi({
  reducerPath: 'classifiersAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  tagTypes: ['Classifiers'],
  endpoints: build => ({
    getSpeciality: build.mutation<
      Array<SpecialityModel>,
      {id?: number; token: string}
    >({
      query: data => ({
        url: `classifiers/${api_endpoints.classifiers.SPECIALITIES}${
          data.id ? `/${data.id}/` : '/'
        }`,
        method: 'GET',
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
    getHourIntervals: build.mutation<
      Array<HourIntervalsModel>,
      {id?: number; token: string}
    >({
      query: data => ({
        url: `classifiers/${api_endpoints.classifiers.HOUR_INTERVALS}${
          data.id ? `/${data.id}/` : '/'
        }`,
        method: 'GET',
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),

    getNews: build.mutation<NewsModel[], Request<NewsRequestModel>>({
      query: ({token, params}) => ({
        url: `/${api_endpoints.news.NEWS}/`,
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {...params},
      }),
    }),
  }),
});
