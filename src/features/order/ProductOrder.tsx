import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {FC} from 'react';
import CustomHeader from '@components/ui/CustomHeader';
import {Colors, Fonts} from '@utils/Constants';
import OrderList from './OrderList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomText from '@components/ui/CustomText';
import {useCartStore} from '@state/cartStore';
import BillDetails from './BillDetails';
import {hocStyles} from '@styles/GlobalStyles';
import {useAuthStorage} from '@state/authStorage';
import ArrowButton from '@components/ui/ArrowButton';
import {navigate} from '@utils/NavigationUtils';
import {createOrder} from '@service/orderService';

const ProductOrder: FC = () => {
  const {user, setCurrentOrder, currentOrder} = useAuthStorage();
  const {getTotalPrice, cart, clearCart} = useCartStore();
  const totalItemPrice = getTotalPrice();
  const [loading, setLoading] = React.useState(false);

  const handlePlaceOrder = async () => {
    if (currentOrder !== null) {
      Alert.alert('Let first your order be delivered');
      return;
    }

    const formatData = cart.map(item => ({
      id: item._id,
      item: item._id,
      count: item.count,
    }));
    console.log("dsd",formatData);
    console.log("totalItemPrice",totalItemPrice);
    if (formatData.length === 0) {
      Alert.alert('Cart is empty');
      return;
    }
    setLoading(true);
    const data = await createOrder(formatData, totalItemPrice);
    console.log("data",data);
    if (data != null) {
      setCurrentOrder(data);
      clearCart();
      navigate('OrderSuccess', {...data});
    } else {
      Alert.alert('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <View style={styles.constainer}>
      <CustomHeader title="Checkout" search={false} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <OrderList />
        <View style={styles.flexRowBetween}>
          <View style={styles.flexRow}>
            <Image
              source={require('@assets/icons/coupon.png')}
              style={{width: 25, height: 25}}
            />
            <CustomText variant="h8" style={{opacity: 0.8}}>
              Apply Coupon
            </CustomText>
          </View>
          <Icon name="chevron-right" size={RFValue(16)} color={Colors.text} />
        </View>

        <BillDetails totalItemPrice={totalItemPrice} />
        <View style={styles.flexRowBetween}>
          <View>
            <CustomText variant="h8" fontFamily={Fonts.SemiBold}>
              Cancellation Policy
            </CustomText>
            <CustomText
              variant="h9"
              style={styles.cancelText}
              fontFamily={Fonts.SemiBold}>
              Orders cannot be canceled once placed. In case of a delay in
              delivery, a refund will be provided if applicable, subject to our
              terms and conditions* .
            </CustomText>
          </View>
        </View>
      </ScrollView>

      <View style={hocStyles.cartContainer}>
        <View style={styles.absolutecontainer}>
          <View style={styles.addressContainer}>
            <View style={styles.flexRow}>
              <Image
                source={require('@assets/icons/home.png')}
                style={{width: 20, height: 20}}
              />
              <View style={{width: '75%'}}>
                <CustomText variant="h8" fontFamily={Fonts.Medium}>
                  Delivering to home
                </CustomText>
                <CustomText variant="h9" numberOfLines={2}>
                  {user?.address}
                </CustomText>
              </View>
            </View>
            <TouchableOpacity>
              <CustomText
                variant="h8"
                style={{color: Colors.secondary}}
                fontFamily={Fonts.SemiBold}>
                {' '}
                Change
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.payment}>
            <View style={{width: '30%'}}>
              <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Regular}>
                Pay Using
              </CustomText>
              <CustomText fontFamily={Fonts.Regular} variant="h9">
                Cash On Delivery
              </CustomText>
            </View>
            <View style={{width: '70%'}}>
              <ArrowButton
                loading={loading}
                price={totalItemPrice}
                title="Place Order"
                onPress={handlePlaceOrder}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderBottomWidth: 0.75,
    borderColor: Colors.border,
    paddingBottom: 10,
  },
  constainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    paddingBottom: 250,
  },
  flexRowBetween: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 15,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  cancelText: {
    marginTop: 5,
    opacity: 0.6,
  },
  absolutecontainer: {
    marginVertical: 15,
    marginBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  payment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 14,
  },
});

export default ProductOrder;
