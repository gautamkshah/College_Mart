import axiosClient from '../lib/axiosClient';
import { appAxios } from './apiInterceptors';

export const createOrder = async (items:any, totalPrice: number) => {
    try {
        const response = await axiosClient.post(`/api/order`, {
            items:items,
            branch:"66cdf770d4ee7398013ad4ef",
            totalPrice: totalPrice
        });
        console.log("Create Order response",response.data)
        return response.data
    } catch (e) {
        console.log("Create Order error",e)
        return null
    }
}

