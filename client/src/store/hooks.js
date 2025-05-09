// AUTH
export {
    useGetAccountQuery,
    useLoginMutation,
} from './api/authApi';


// TICKET
export {
    useCreateTicketMutation,
    useGetTicketsByUserQuery,
    useGetTicketByIdAndUserQuery,
    useCloseTicketMutation,

} from './api/ticketApi';

// ADMIN
export {
  useGetAllTicketsQuery,
  useReplyToTicketMutation,
  useCloseTicketMutation,
  useGetTicketDetailByIdQuery,
  
} from './api/adminApi';