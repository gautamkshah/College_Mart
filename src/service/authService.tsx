import axios from 'axios'
import { BASE_URL } from './config'
import { tokenStorage } from '@state/storage'
import { useAuthStorage } from '@state/authStorage'
import { resetAndNavigate } from '@utils/NavigationUtils'
import axiosClient from '../lib/axiosClient'
import { appAxios } from './apiInterceptors'

export const customerLogins = async (phone: string) => {
    try {
        console.log("Phone", phone);
        const response = await axiosClient.post('/api/customer/login', { phone });
        const { accessToken, refreshToken, customer } = response.data;
        console.log(accessToken)
        tokenStorage.set("accessToken", accessToken);
        tokenStorage.set("refreshToken", refreshToken);
        const { setUser } = useAuthStorage.getState();
        console.log("Customer", customer);
        
        setUser(customer);
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error:", e.response?.data || e.message);
        } else {
            console.log("Unexpected error:", e);
        }
    }
};

export const deliveryLogin = async (email: string,password:string) => {
    try {
        console.log("Email", email);
        const response = await axiosClient.post('/api/delivery/login', { email,password });
        const { accessToken, refreshToken, deliveryPartner } = response.data;
        tokenStorage.set("accessToken", accessToken);
        tokenStorage.set("refreshToken", refreshToken);
        console.log("Delivery", accessToken);
        const { setUser } = useAuthStorage.getState();
        setUser(deliveryPartner);
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("Axios error:", e.response?.data || e.message);
        } else {
            console.log("Unexpected error:", e);
        }
    }
};

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
        const response = await appAxios.get(`/user`)
        setUser(response.data.user)     
    } catch (e) {
        console.log("Login error",e)
    }
}




