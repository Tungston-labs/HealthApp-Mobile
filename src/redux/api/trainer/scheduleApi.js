import api from '../../../services/api';
import { axiosBaseQuery } from '../axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: axiosBaseQuery({
    axiosInstance: api,
    baseUrl: '/', // axios already has baseURL
  }),
  tagTypes: ['TodaysSections', 'SlotBooking'],
  endpoints: builder => ({
    getTodaysSchedules: builder.query({
      query: () => ({
        url: 'section/today-sessions/',
        method: 'GET',
      }),
      providesTags: ['TodaysSections'],
      keepUnusedDataFor: 60,
    }),

    getTrainerSlotBookingById: builder.query({
      query: id => ({
        url: `section/trainer/slot-bookings/${id}/`,
        method: 'GET',
      }),
      providesTags: (result, err, id) => [{ type: 'SlotBooking', id }],
      keepUnusedDataFor: 30,
    }),
  }),
});

export const { useGetTodaysSchedulesQuery,useGetTrainerSlotBookingByIdQuery } = scheduleApi;
