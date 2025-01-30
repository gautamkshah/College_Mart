import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { useAuthStorage } from '@state/authStorage';
import { useCartStore } from '@state/cartStore';
import { fetchCustomerOrders } from '@service/orderService';
import CustomHeader from '@components/ui/CustomHeader';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';
import WalletSection from './WalletSection';
import ActionButton from './ActionButton';
import OrderItem from './OrderItem';
import { storage, tokenStorage } from '@state/storage';
import { resetAndNavigate } from '@utils/NavigationUtils';

const Profile: FC = () => {
  const [orders, setOrders] = useState([]);
  const { logout, user } = useAuthStorage();
  const { clearCart } = useCartStore();

  const fetchOrders = async () => {
    const data = await fetchCustomerOrders(user?._id);
    // Sort orders by `createdAt` date in descending order
    const sortedOrders = data.sort(
      (a: { createdAt: string }, b: { createdAt: string }) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setOrders(sortedOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderHeader = () => {
    return (
      <View>
        <CustomText variant="h3" fontFamily={Fonts.SemiBold}>
          Your Account
        </CustomText>
        <CustomText variant="h7" fontFamily={Fonts.Medium}>
          {user?.phone}
        </CustomText>
        <WalletSection />
        <CustomText variant="h3" style={style.informativeText}>
          Your Information
        </CustomText>
        <ActionButton icon="book-outline" label="Address book" />
        <ActionButton icon="information-circle-outline" label="About Us" />
        <ActionButton
          icon="log-out-outline"
          label="Logout"
          onPress={() => {
            clearCart();
            logout();
            tokenStorage.clearAll();
            storage.clearAll();
            resetAndNavigate('CustomerLogin');
          }}
        />
        <CustomText variant="h3" style={style.pastText}>
          Past Orders
        </CustomText>
      </View>
    );
  };

  const renderOrders = ({ item, index }: any) => {
    return <OrderItem item={item} index={index} />;
  };

  return (
    <View style={style.container}>
      <CustomHeader title="Profile" search={false} />
      <FlatList
        data={orders}
        ListHeaderComponent={renderHeader}
        renderItem={renderOrders}
        keyExtractor={(item: any) => item?.orderId}
        contentContainerStyle={style.scrollviewContent}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollviewContent: {
    padding: 10,
    paddingBottom: 100,
    paddingTop: 20,
  },
  informativeText: {
    opacity: 0.7,
    marginBottom: 20,
  },
  pastText: {
    marginVertical: 20,
    opacity: 0.7,
  },
});

export default Profile;
