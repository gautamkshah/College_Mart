import {View, Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '@utils/NavigationUtils';
import {useAuthStorage} from '@state/authStorage';
import CustomText from '@components/ui/CustomText';
import { Fonts } from '@utils/Constants';

const LiveHeader: FC<{
  type: 'Customer' | 'Delivery';
  title: string;
  secondtitle: string;
}> = ({type, title, secondtitle}) => {
  const isCustomer = type === 'Customer';
  const {currentOrder, setCurrentOrder} = useAuthStorage();

  return (
    <SafeAreaView>
      <View style={styles.headerContiner}>
        <Pressable
        style={styles.backButton}
          onPress={() => {
            if (isCustomer) {
              navigate('ProductDashboard');
              if (currentOrder?.status == 'delivered') {
                setCurrentOrder(null);
              }
              return;
            }
            navigate('DeliveryDashboard');
          }}>
          <Icon
            name="chevron-back"
            size={RFValue(16)}
            color={isCustomer ? '#fff' : '#000'}
          />
        </Pressable>
        <CustomText variant='h6' fontFamily={Fonts.Medium} style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}>
            {title}
        </CustomText>
        <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}>
            {secondtitle}
        </CustomText>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  headerContiner: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
   
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  titleTextBlack: {
    color: 'black',
  },
  titleTextWhite: {
    color: 'white',
  },
});

export default LiveHeader;
