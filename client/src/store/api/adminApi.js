import { createApi } from '@reduxjs/toolkit/query/react'
import { customBaseQuery } from '../customBaseQuery'

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: customBaseQuery,
  tagTypes: ['Ticket'],
  endpoints: (builder) => ({
    getAllTickets: builder.query({
      query: ({ status, page = 0, size = 10, sort = 'createdAt,desc' }) => {
        const params = new URLSearchParams({ page, size, sort })
        if (status) params.append('status', status)
        return {
          url: `/admin/tickets?${params.toString()}`,
          method: 'GET',
        }
      },
      providesTags: ['Ticket'],
    }),
    replyToTicket: builder.mutation({
      query: ({ id, adminResponse }) => ({
        url: `/admin/tickets/${id}/reply`,
        method: 'PATCH',
        body: { adminResponse },
      }),
      invalidatesTags: ['Ticket'],
    }),
    closeTicket: builder.mutation({
      query: (id) => ({
        url: `/admin/tickets/${id}/close`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Ticket'],
    }),
    getTicketDetailById: builder.query({
        query: (id) => ({
            url: `/admin/tickets/${id}`,
            method: 'GET',
        }),
        providesTags: ["Ticket"]
    })
  }),
})

export const {
  useGetAllTicketsQuery,
  useReplyToTicketMutation,
  useCloseTicketMutation,
  useGetTicketDetailByIdQuery,

} = adminApi

export default adminApi
