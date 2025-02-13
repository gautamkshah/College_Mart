import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { useAuthStorage } from '@state/authStorage';
import { Colors, Fonts } from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { resetAndNavigate } from '@utils/NavigationUtils';
import { storage, tokenStorage } from '@state/storage';
import ActionButton from '@features/Profile/ActionButton';

interface DeliveryHeaderProps {
  name: string;
  email?: string;
}

const DeliveryHeader: FC<DeliveryHeaderProps> = ({ name, email }) => {
  const { logout, user } = useAuthStorage();


 
  return (
    <View style={styles.flexRow}>
      <View style={styles.imgContainer}>
        <Image
          source={require('@assets/images/delivery_boy.png')}
          style={styles.img}
        />
      </View>
      <View style={styles.infoContainer}>
        <CustomText variant="h4" fontFamily={Fonts.SemiBold}>
          Hello {name}
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.SemiBold}>
          {email}
        </CustomText>
      </View>
      <ActionButton
        icon="log-out-outline"
        label=""
        onPress={() => {

          logout();
          tokenStorage.clearAll();
          storage.clearAll();
          resetAndNavigate('CustomerLogin');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  flexRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  imgContainer: {
    padding: 4,
    borderRadius: 100,
    height: 60,
    width: 60,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundSecondary,
  },
  img: {
    width: '100%',
    height: '100%',
    bottom: -8,
    resizeMode: 'contain',
  },
  infoContainer: {
    width: '70%',
  },
});
export default DeliveryHeader;
