import axiosClient from '../lib/axiosClient';
import {appAxios} from './apiInterceptors';

export const createOrder = async (items: any, totalPrice: number) => {
  try {
    const response = await axiosClient.post(`/api/order`, {
      items: items,
      branch: 'KL main branch',
      totalPrice: totalPrice,
    });
    // console.log("Create Order response",response.data)
    return response.data.order;
  } catch (e) {
    console.log('Create Order error', e);
    return null;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const response = await axiosClient.get(`/api/order/${id}`);
    // console.log("get order by id response",response.data)
    return response.data.order;
  } catch (e) {
    console.log('Fetch Order error', e);
    return null;
  }
};
export const fetchCustomerOrders = async (userId: string) => {
  try {
    const response = await axiosClient.get(`/api/order?customerId=${userId}`);
    // console.log("get order by id response",response.data)
    return response.data.orders;
  } catch (e) {
    console.log('Fetch Customer Order error', e);
    return null;
  }
};
export const fetchOrders = async (
  status: string,
  userId: string,
  branchId: string,
) => {
  let uri =
    status == 'available'
      ? `/api/order?status=${status}&branchId=${branchId}`
      : `/api/order?status=${status}`;
  // console.log("URI",uri)
  try {
    const response = await axiosClient.get(uri);
    // console.log('Delivery response ', response.data);
    return response.data.orders;
  } catch (e) {
    console.log('Fetch Delivery Order error', e);
    return null;
  }
};

export const sendLiveOrderUpdate = async (
  id: string,
  Location: string,
  status: string,
) => {
  try {
    const response = await axiosClient.patch(`/api/order/${id}/status`, {
      deliveryPersonLocation: Location,
      status: status,
    });
    // console.log("sendLiveOrderUpdate ",response.data)
    return response.data;
  } catch (e) {
    console.log('sendLiveOrderUpdate error', e);
    return null;
  }
};

export const confirmOrder = async (
  id: string,
  Location: string,
  userid: string,
) => {
  try {
    const response = await axiosClient.post(`/api/order/${id}/confirm`, {
      orderId: id,
      userId: userid,
      deliveryPersonLocation: Location,
    });
    // console.log("confirmOrder ",response.data)
    return response.data;
  } catch (e) {
    console.log('confirmOrder error', e);
    return null;
  }
};
