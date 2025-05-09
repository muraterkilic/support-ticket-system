import { createApi } from '@reduxjs/toolkit/query/react';
import { customBaseQuery } from '../customBaseQuery';

export const ticketApi = createApi({
    reducerPath: 'ticketApi',
    baseQuery: customBaseQuery,
    tagTypes: ["Ticket"],
    endpoints: (builder) => ({
        createTicket: builder.mutation({
            query: (data) => ({
                url: '/user/tickets',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ["Ticket"]
        }),
        getTicketsByUser: builder.query({
            query: () => ({
                url: "/user/tickets",
                method: "GET"
            }),
            providesTags: ["Ticket"]
        }),
        getTicketByIdAndUser: builder.query({
            query: (ticketId) => ({
                url: `/user/tickets/${ticketId}`,
                method: "GET"
            }),
            providesTags: ["Ticket"]
        }),
        closeTicket: builder.mutation({
            query: (ticketId) => ({
                url: `/user/tickets/${ticketId}/close`,
                method: "PATCH"
            }),
            invalidatesTags: ["Ticket"]
        }),
    }),
});

export const {
    useCreateTicketMutation,
    useGetTicketsByUserQuery,
    useGetTicketByIdAndUserQuery,
    useCloseTicketMutation
} = ticketApi;

export default ticketApi;
