import {View, Text, StyleSheet} from 'react-native';
import React, {FC, useEffect} from 'react';
import {screenWidth} from '@utils/scalling';
import {Colors, Fonts} from '@utils/Constants';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import {useAuthStorage} from '@state/authStorage';
import {printNavigationStack, replace} from '@utils/NavigationUtils';

const OrderSuccess: FC = () => {
  const {user} = useAuthStorage();
  const {currentOrder,setCurrentOrder} = useAuthStorage()
  console.log("sec",currentOrder);
   printNavigationStack()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      replace('LiveTracking'

      );
    }, 2300);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.contianer}>
      <LottieView
        source={require('../../assets/animations/confirm.json')}
        autoPlay
        loop={false}
        style={styles.lottieView}
        duration={2000}
        speed={1}
        enableMergePathsAndroidForKitKatAndAbove
        hardwareAccelerationAndroid
      />
      <CustomText
        variant="h8"
        fontFamily={Fonts.SemiBold}
        style={styles.orderPlacedText}>
        Order Placed
      </CustomText>
      <View style={styles.deliveryContainer}>
        <CustomText
          variant="h4"
          fontFamily={Fonts.SemiBold}
          style={styles.deliveryText}>
          Deliverying to Home
        </CustomText>
      </View>
      <CustomText
        variant="h8"
        style={styles.addresstext}
        fontFamily={Fonts.Medium}>
        {user?.address || 'No Address'}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lottieView: {
    width: screenWidth * 0.6,
    height: 150,
  },
  orderPlacedText: {
    opacity: 0.5,
  },
  deliveryContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderBlockColor: Colors.secondary,
  },
  deliveryText: {
    marginTop: 15,
    borderColor: Colors.secondary,
  },
  addresstext: {
    opacity: 0.8,
    textAlign: 'center',
    width: '80%',
    marginTop: 10,
  },
});

export default OrderSuccess;
