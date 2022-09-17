import * as type from '../actions/actionTypes';

const initialState = { accountsClient: [], transactionsClient: [], benificiaresClient: [], transferCreated: false ,otp_verified_transfer:"", otp_succ:""};

export default (state = initialState, action) => {

    switch (action.type) {

        case type.GET_SUCCESS:
            return {
                ...state,
                accountsClient: action.payload
            }
        case type.GET_FAIL:
            return {
                ...state,
                accountsClient: [],
            }
        case type.GET_SUCCESS_TRANSACTIONS:
            return {
                ...state,
                transactionsClient: action.payload
            }
        case type.GET_FAIL_TRANSACTIONS:
            return {
                ...state,
                transactionsClient: [],
            }

        case type.GET_SUCCESS_BENIFICIARIES:
            return {
                ...state,
                benificiaresClient: action.payload
            }
        case type.GET_FAIL_BENIFICIARIES:
            return {
                ...state,
                benificiaresClient: [],
            }

        case type.TRANSFER_SUCCESS:
            return {
                ...state,
                transferCreated: true,
            }

        case type.TRANSFER_FAIL:
            return {
                ...state,
                transferCreated: false,
            }
        case type.CLEAR_TRANSFER_CREATED:
            return {
                ...state,
                transferCreated: false,
            }

        case type.EDIT_SUCCESS:
            return {
                ...state,
                editedSuccess: true,
            }

        case type.EDIT_FAIL:
            return {
                ...state,
                editedSuccess: false,
            }
        case type.LOGOUT:
            return {
                transferCreated: false,
                editedSuccess: false,
                transactionsClient: [],
                benificiaresClient: [],
                accountsClient: [],
            }

        case type.CLEAR_ALL:
            return {
                ...state,
                transferCreated: false,
                editedSuccess: false,
                otp_succ: "",
            }

        case type.SEND_OTP_TRANSFER_SUCCESS:
            return {
                ...state,
                otp_succ: action.payload
            }
        case type.SEND_OTP_TRANSFER_FAIL:
            return {
                ...state,
                otp_succ: ""
            }
        case type.VERIFY_OTP_TRANSFER_SUCCESS:
            return {
                ...state,
                otp_verified_transfer: action.payload
            }
        case type.VERIFY_OTP_TRANSFER_FAIL:
            return {
                ...state,
                otp_verified_transfer: ""
            }
        case type.CLEAR_OTP_RESPONSE:
            return {
                ...state,
                otp_verified_transfer: ""
            }
            
        default:
            return state;
    }
}