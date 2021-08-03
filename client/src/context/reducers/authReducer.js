// import actionTypes from "../actions/action_types";

// export const initialState = {
//   is_authenticated: false,
//   loading: false,
//   success: false,
//   error: null,
// };

// export const authReducer = (state, action) => {
//   switch (action.type) {
//     case actionTypes.LOADING:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//         success: false,
//         is_authenticated: false,
//       };
//     case actionTypes.ERROR:
//       return {
//         ...state,
//         loading: false,
//         is_authenticated: false,
//         success: false,
//         error: action.payload,
//       };
//     case actionTypes.LOGIN:
//       return {
//         ...state,
//         loading: false,
//         is_authenticated: true,
//         success: true,
//         error: null,
//       };
//     case actionTypes.LOGOUT:
//       return {
//         ...state,
//         loading: false,
//         is_authenticated: false,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };
