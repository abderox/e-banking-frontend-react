
const API_URL_V1 = 'http://localhost:8080/api/v1';
const API_URL_V2 = 'http://localhost:8080/api/v2';
const AUTH_BASE_URL = API_URL_V1 + '/auth';
const SIGN_IN_URL_ADMIN = "/sign-in-admin";
const SIGN_OUT_URL_ADMIN = "/auth/sign-out-admin";
const SIGN_IN_URL_CLIENT = "/sign-in-client";
const SIGN_OUT_URL_CLIENT = "/auth/sign-out-client";
const SIGN_UP_URL_CLIENT = "/auth/register-client";

export default {
    API_URL_V1, API_URL_V2,
    AUTH_BASE_URL, SIGN_IN_URL_ADMIN,
    SIGN_OUT_URL_ADMIN, SIGN_IN_URL_CLIENT, SIGN_OUT_URL_CLIENT, SIGN_UP_URL_CLIENT
};
