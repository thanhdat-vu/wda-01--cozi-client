const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, isAuth: true, authData: action?.data };
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, isAuth: true, authData: null };
        default:
            return state;
    }
}

export default authReducer;