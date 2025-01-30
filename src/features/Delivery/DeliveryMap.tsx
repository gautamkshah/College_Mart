import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {useAuthStorage} from '@state/authStorage';
import {
  confirmOrder,
  getOrderById,
  sendLiveOrderUpdate,
} from '@service/orderService';
import {Colors, Fonts} from '@utils/Constants';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';

import {useRoute} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import LiveHeader from '@features/map/LiveHeader';
import LiveMap from '@features/map/LiveMap';
import DeliveryDetails from '@features/map/DeliveryDetails';
import OrderSummary from '@features/map/OrderSummary';
import {hocStyles} from '@styles/GlobalStyles';
import CustomButton from '@components/ui/CustomButton';
import { printNavigationStack } from '@utils/NavigationUtils';

const DeliveryMap: FC = () => {
  const user = useAuthStorage(state => state.user);
  const [orderData, setOrderData] = useState<any>(null);
  const [myLocation, setMyLocation] = useState<any>(null);
  const route = useRoute();
  const orderDetails = route?.params as Record<string, any>;
  const {setCurrentOrder} = useAuthStorage();

  const fetchOrderDetails = async () => {
    const data = await getOrderById(orderDetails?._id as any);

    setOrderData(data);
  };
   printNavigationStack()

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        setMyLocation({latitude, longitude});
      },
      error => {
        console.log('Error in geolocation', error);
      },
      {enableHighAccuracy: true, distanceFilter: 2},
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);

  let message = 'Start this order';
  if (orderData?.status === 'available') {
    message = 'Grab your order';
  } else if (orderData?.status === 'arriving') {
    message = 'Deliver this order';
  } else if (orderData?.status === 'delivered') {
    message = 'Order delivered';
  } else if (orderData?.status != 'confirmed') {
    message = 'Order is already taken';
  }

  useEffect(() => {
    async function sendLiveUpdate() {
      if (
        orderData?.deliveryPartner?._id === user?._id &&
        orderData?.status != 'delivered'
      ) {
        await sendLiveOrderUpdate(orderData._id, myLocation, orderData?.status);
        fetchOrderDetails();
      }
    }
  }, [myLocation]);

  const acceptOrder = async () => {
    console.log('Order Daa', orderData?._id);
    console.log('My Location', myLocation);
    console.log('User', user);

    const data = await confirmOrder(orderData?._id, myLocation, user?._id);
    if (data) {
      setCurrentOrder(data);
      Alert.alert('orderAccepted, Grab the package');
    } else {
      Alert.alert('Failed to accept order');
    }
    fetchOrderDetails();
  };
  const orderPickedUp = async () => {
    const data = await sendLiveOrderUpdate(
      orderData?._id,
      myLocation,
      'arriving',
    );
    if (data) {
      setCurrentOrder(data);
      Alert.alert('Order Picked Up');
    } else {
      Alert.alert('Failed to accept order');
    }
    fetchOrderDetails();
  };
  const orderDelivered = async () => {
    const data = await sendLiveOrderUpdate(
      orderData?._id,
      myLocation,
      'delivered',
    );
    if (data) {
      setCurrentOrder(data);
      Alert.alert('Order Delivered');
    } else {
      Alert.alert('Failed to accept order');
    }
    fetchOrderDetails;
  };

  return (
    <View style={styles.continer}>
      <LiveHeader
        type="Delivery"
        title={message}
        secondtitle={'Delivery in 10 min'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <LiveMap />
        <DeliveryDetails details={orderData?.customer} />
        <OrderSummary order={orderData} />
      </ScrollView>
      {orderData?.status != 'delivered' && orderData?.status != 'cancelled' && (
        <View style={[hocStyles.cartContainer, styles.btnContainer]}>
          {orderData?.status == 'available' && (
            <CustomButton
              disabled={false}
              title="Accept Order"
              onPress={acceptOrder}
              loading={false}
            />
          )}
          {orderData?.status == 'confirmed' && (
            <CustomButton
              disabled={false}
              title="Order Picked"
              onPress={orderPickedUp}
              loading={false}
            />
          )}
          {orderData?.status == 'arriving' &&
         (
              <CustomButton
                disabled={false}
                title="Delivered"
                onPress={orderDelivered}
                loading={false}
              />
            )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContent: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
  flexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    borderRadius: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 0.75,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    padding: 10,
  },
});

export default DeliveryMap;
