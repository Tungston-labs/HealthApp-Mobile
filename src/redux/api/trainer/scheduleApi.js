import api from '../../../services/api';
import { axiosBaseQuery } from '../axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: axiosBaseQuery({
    axiosInstance: api,
    baseUrl: '/', // axios already has baseURL
  }),
  tagTypes: ['UpcomingSessions', 'SlotBooking', 'Notes', 'ActiveSession'],
  endpoints: builder => ({
    getUpcomingSchedules: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: 'section/trainer/bookings/',
        method: 'GET',
        params: { page, page_size: limit },
      }),
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newData) => {
        if (!currentCache?.results || newData.current_page === 1) {
          currentCache.results = newData.results;
        } else {
          const existingIds = new Set(
            currentCache.results.map(item => item.id),
          );

          const uniqueNewItems = newData.results.filter(
            item => !existingIds.has(item.id),
          );

          currentCache.results.push(...uniqueNewItems);
        }

        currentCache.current_page = newData.current_page;
        currentCache.total_pages = newData.total_pages;
        currentCache.total_items = newData.total_items;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: ['UpcomingSessions'],
      refetchOnFocus: true,
      refetchOnReconnect: true,
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
        data: { booking_id: id },
      }),
      invalidatesTags: ['ActiveSession', 'UpcomingSessions'],
    }),

    endTrainerSession: builder.mutation({
      query: id => ({
        url: `section/end-training/`,
        method: 'POST',
        data: { booking_id: id },
      }),
    }),

    getOngoingSession: builder.query({
      query: () => ({
        url: 'trainer/ongoing-sessions/',
        method: 'GET',
      }),
      transformResponse: response => {
        if (response?.message === 'No ongoing session') {
          return null;
        }

        return {
          session_id: response.session_id,
          started_at: new Date(response.session_start_apihit_time).getTime(),
          duration: Number(response.session_duration?.value || 0),
        };
      },
      providesTags: ['ActiveSession'],
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }),
  }),
});

export const {
  useGetUpcomingSchedulesQuery,
  useGetTrainerSlotBookingByIdQuery,
  useGetTrainerNotesQuery,
  useAddTrainerNoteMutation,
  useStartTrainerSessionMutation,
  useGetOngoingSessionQuery,
  useEndTrainerSessionMutation,
} = scheduleApi;
