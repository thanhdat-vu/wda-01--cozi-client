import * as api from '../api/index.js';

export const signIn = (formData) => async (dispatch) => {
    return await api.signIn(formData).then(
        (response) => {
            dispatch({
                type: 'AUTH',
                data: response.data,
            });
            return Promise.resolve();
        },
        (error) => {
            console.log(error);
            return Promise.reject(error.response.data.message);
        }
    )
}

export const signUp = (formData) => async (dispatch) => {
    return api.signUp(formData).then(
        (response) => {
            dispatch({
                type: 'AUTH',
                data: response.data,
            });
            return Promise.resolve();
        },
        (error) => {
            console.log(error);
            return Promise.reject(error.response.data.message);
        }
    )
}