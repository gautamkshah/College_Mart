import CustomText from '@components/ui/CustomText';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {SOCKET_URL} from '@service/config';
import {getOrderById} from '@service/orderService';
import {useAuthStorage} from '@state/authStorage';
import {hocStyles} from '@styles/GlobalStyles';
import {Colors, Fonts} from '@utils/Constants';
import {navigate} from '@utils/NavigationUtils';
import {FC, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import io from 'socket.io-client';

const withLiveStatus = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> => {
  const WithLiveStatusComponent: FC<P> = props => {
    const {currentOrder, setCurrentOrder} = useAuthStorage();
    const routeName = useNavigationState(
      state => state.routes[state.index]?.name,
    );
    const fetchOrderDetails = async () => {
      const data = await getOrderById(currentOrder?._id as any);
      setCurrentOrder(data);
    };

    useEffect(() => {
      if (currentOrder) {
        const socketInstance = io(SOCKET_URL, {
          transports: ['websocket'],
          withCredentials: false,
        });
        socketInstance.emit('joinRoom', currentOrder._id);
        socketInstance.on('LiveTrackingUpdates', updateOrder => {
          fetchOrderDetails();
          console.log('LiveTrackingUpdates', updateOrder);
        });
        socketInstance.on('orderConfirmed', confirmOrder => {
          fetchOrderDetails();
          console.log('orderConfirmed', confirmOrder);
        });
        return () => {
          socketInstance.disconnect();
        };
      }
    }, [currentOrder]);

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        {currentOrder && routeName === 'ProductDashboard' && (
          <View
            style={[
              hocStyles.cartContainer,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View style={styles.flexrow}>
              <View style={styles.img}>
                <Image
                  source={require('@assets/icons/bucket.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
              <View style={{width: '68%'}}>
                <CustomText variant="h8" fontFamily={Fonts.Medium}>
                  Order Is {currentOrder?.status}
                </CustomText>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigate('LiveTracking')}
              style={styles.btn}>
              <CustomText variant="h8" fontFamily={Fonts.Medium}>
                Track
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  return WithLiveStatusComponent;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 15,
    marginBottom: 15,
    paddingVertical: 10,
    padding: 10,
  },
  img: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 0.7,
    borderRadius: 5,
    borderColor: Colors.secondary,
  },
});

export default withLiveStatus;
