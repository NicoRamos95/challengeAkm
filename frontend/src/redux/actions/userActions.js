import axios from "axios"
import {Url} from "../../components/ApiUrl"
const authActions = {
    newUser: (user) => {
        return async (dispatch) => {
            const response = await axios.post(`${Url}/user/register`, user)
            if (!response.data.success) {
                return response.data
            }
            dispatch({type: 'LOG_USER', payload: response.data})
        }
    },
    logOutUser: () => {
        return (dispatch) => {
            dispatch({type: 'LOG_OUT_USER'})
        }
    },
    logLS: (token) => {
        return async (dispatch) => {
            try {
                const respuesta = await axios.post( `${Url}/user/ls `, {token}, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
                
            })
            dispatch({type: 'LOG_USER', payload: {response: {...respuesta.data.response}}})
            } catch(err) {
                if (err.response.status === 401) {
                    alert("Usted esta intentando entrar...")
                    localStorage.clear()
                    return '/'
                }
            }
        }
    },
    loginUser: (user) => {
        return async (dispatch) => {
            const response = await axios.post( `${Url}/user/login`, user)
            console.log(response.data.response)
            if (!response.data.success) {
                return response.data
            }
            dispatch({type: 'LOG_USER', payload: response.data})
        }
    }
}

export default authActions