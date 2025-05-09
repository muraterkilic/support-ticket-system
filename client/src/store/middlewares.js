import { adminApi } from "./api/adminApi";
import authApi from "./api/authApi";
import ticketApi from "./api/ticketApi";


const apiMiddlewares = [
    authApi.middleware,
    ticketApi.middleware,
    adminApi.middleware,
];

export default apiMiddlewares;
