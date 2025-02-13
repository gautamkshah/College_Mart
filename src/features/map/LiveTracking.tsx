import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useAuthStorage} from '@state/authStorage';
import {getOrderById} from '@service/orderService';
import {Colors, Fonts} from '@utils/Constants';
import LiveHeader from './LiveHeader';

import LiveMap from './LiveMap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import DeliveryDetails from './DeliveryDetails';
import OrderSummary from './OrderSummary';
import withLiveStatus from './withLiveStatus';

const LiveTracking: FC = () => {
  const {currentOrder, setCurrentOrder} = useAuthStorage();
  
  const fetchOrderDetails = async () => {
    const data = await getOrderById(currentOrder?._id as any);
    setCurrentOrder(data);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  let msg = 'Packing your order';
  let time = 'Arriving in 10 minutes';
  if (currentOrder?.status == 'confirmed') {
    msg = 'Arriving Soon';
    time = 'Arriving in 8 minutes';
  } else if (currentOrder?.status == 'arriving') {
    msg = 'Order Picked Up';
    time = 'Arriving in 6 minutes';
  } else if (currentOrder?.status == 'delivered') {
    msg = 'Order Delivered';
    time = 'Arrived';
  }
  if (!currentOrder) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>No current order available</Text>
      </View>
    );
  }

  return (
    <View style={styles.continer}>
      <LiveHeader type="Customer" title={msg} secondtitle={time} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <LiveMap />
        <View style={styles.flexrow}>
          <View style={styles.iconContainer}>
            <Icon
              name={currentOrder?.deliveryPartner ? 'phone' : 'shopping'}
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>
          <View style={{width: '82%'}}>
            <CustomText
              variant="h8"
              numberOfLines={1}
              style={{color: Colors.disabled}}>
              {currentOrder?.deliveryPartner?.name || 'We will notify you soon'}
            </CustomText>
            {currentOrder?.deliveryPartner && (
              <CustomText variant="h8" style={{color: Colors.disabled}}>
                {currentOrder?.deliveryPartner?.phone}
              </CustomText>
            )}
            <CustomText
              variant="h8"
              style={{color: Colors.disabled}}
              fontFamily={Fonts.Medium}>
              {currentOrder?.deliveryPartner
                ? 'For any query contact delivery partner'
                : msg}
            </CustomText>
          </View>
        </View>
        <DeliveryDetails details={currentOrder?.customer} />
        <OrderSummary order={currentOrder} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: Colors.secondary,
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
});

export default withLiveStatus(LiveTracking);
