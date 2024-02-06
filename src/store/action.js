export const ADDITION = 'ADDITION';
export const SUBSTRACTION = 'SUBSTRACTION';
export const GET_LOCAL_USER = 'GET_LOCAL_USER';
export const SET_LOCAL_USER = 'SET_LOCAL_USER';

export const addition = () => ({
    type: ADDITION
});

export const substraction = () => ({
    type: SUBSTRACTION
})

export const getLocalUser = () => ({
    type: GET_LOCAL_USER
})
export const setLocalUser = () => ({
    type: SET_LOCAL_USER
})
