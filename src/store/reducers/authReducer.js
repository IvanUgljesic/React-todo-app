const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login neuspesan');
            return {
                ...state,
                authError: 'Neuspesno logovanje'
            }
        case 'LOGIN_SUCCESS':
            console.log('login uspeo');
            return {
                ...state,
                authError: null
            }
        case 'SIGNOUT_SUCCESS':
            console.log('korisnik izlogovan')
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('uspesno prijavljivanje')
            return {
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('neuspesno prijavljivanje')
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
}

export default authReducer