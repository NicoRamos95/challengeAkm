const initialState = {
    loggedUser: null
}

export function userReducer(state = initialState, action) { 
    switch (action.type) {
        case 'LOG_USER':
            localStorage.setItem('token', action.payload.response.token)
            return {
                ...state,
                loggedUser: action.payload.response
            }
        case 'LOG_OUT_USER':
            localStorage.clear()
            return {
                ...state,
                loggedUser: null
            }
        default:
            return state
    }

}