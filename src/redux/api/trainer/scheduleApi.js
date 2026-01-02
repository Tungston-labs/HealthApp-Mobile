import api from '../../../services/api';
import { axiosBaseQuery } from '../axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: axiosBaseQuery({
    axiosInstance: api,
    baseUrl: '/', // axios already has baseURL
  }),
  tagTypes: ['TodaysSections', 'SlotBooking','Notes'],
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

    getTrainerNotes: builder.query({
      query: id => ({
        url: `trainer/booking/${id}/note/`,
        method: 'GET',
      }),
      providesTags: (result, err, id) => [{ type: 'Notes', id }],
    }),

    addTrainerNote: builder.mutation({
      query: ({ note, id }) => ({
        url: `trainer/booking/${id}/add-note/`,
        method: 'POST',
        data: { note },
      }),
      invalidatesTags: (result, err, { id }) => [{ type: 'Notes', id }],
    }),

    startTrainerSession: builder.mutation({
      query: id => ({
        url: 'section/start-training/',
        method: 'POST',
        data: { booking_id:id },
      }),
    }),
  }),
});
export const {
  useGetTodaysSchedulesQuery,
  useGetTrainerSlotBookingByIdQuery,
  useGetTrainerNotesQuery,
  useAddTrainerNoteMutation,useStartTrainerSessionMutation
} = scheduleApi;
