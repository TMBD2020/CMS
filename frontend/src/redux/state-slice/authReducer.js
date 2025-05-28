const initialState = {
    token: sessionStorage.getItem('token') || null,
    user_type: sessionStorage.getItem('user_type') || null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('user_type', action.payload.user_type);
            return {
                ...state,
                token: action.payload.token,
                user_type: action.payload.user_type,
            };
        case 'LOGOUT':
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user_type');
            return {
                ...state,
                token: null,
                user_type: null,
            };
        default:
            return state;
    }
};

export default authReducer;
// const initialState = {
//     token: sessionStorage.getItem('token') || null,
//     userType: sessionStorage.getItem('userType') || null,
// };

// const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'LOGIN_SUCCESS':
//             sessionStorage.setItem('token', action.payload.token);
//             sessionStorage.setItem('userType', action.payload.userType);
//             return {
//                 ...state,
//                 token: action.payload.token,
//                 userType: action.payload.userType,
//             };
//         case 'LOGOUT':
//             sessionStorage.removeItem('token');
//             sessionStorage.removeItem('userType');
//             return {
//                 ...state,
//                 token: null,
//                 userType: null,
//             };
//         default:
//             return state;
//     }
// };

// export default authReducer;