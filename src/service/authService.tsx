import axios from 'axios'
import { BASE_URL } from './config'
import { tokenStorage } from '@state/storage'
import { useAuthStorage } from '@state/authStorage'
import { resetAndNavigate } from '@utils/NavigationUtils'

export const customerLogins = async (phone: string) => {
    try {
        
        
        const response = await axios.post(`${BASE_URL}/customer/login`, { phone })
        console.log("Phone", phone)
        const {accessToken,refreshToken,customer} =response.data
        tokenStorage.set("accessToken",accessToken)
        tokenStorage.set("refreshToken",refreshToken)
        const {setUser}= useAuthStorage.getState()
        setUser(customer)
    } catch (e) {
        console.log("Login Faileds", e)
    }
}

export const refresh_tokens = async () => {
    try {

        const refreshToken = tokenStorage.getString('refreshToken')
        const response = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken })
        const new_access_token = response.data.accessToken
        const new_refresh_token = response.data.refreshToken
        tokenStorage.set("accessToken", new_access_token)
        tokenStorage.set("refreshToken", new_refresh_token)
        return new_access_token
        
        
    } catch (e) {

        console.log("Refresh token error", e)
        tokenStorage.clearAll()
        resetAndNavigate("CustomerLogin")
    }
}

export const refetchUser = async (setUser: any ) => {
    try {

        
        
        
    } catch (e) {

        console.log("Refresh token error", e)
        tokenStorage.clearAll()
        resetAndNavigate("CustomerLogin")
    }
}


