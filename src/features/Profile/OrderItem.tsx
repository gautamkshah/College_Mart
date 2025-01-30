import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import {formatISOToCustom} from '@utils/DateUtils';

interface CaratItem {
  _id: string | number;
  item: any;
  count: number;
}
interface Order {
  orderId: string;
  items: CaratItem[];
  totalPrice: number;
  createdAt: string;
  status: 'confirmed' | 'completed';
}

const OrderItem: FC<{item: Order; index: number}> = ({item, index}) => {
  return (
    <View
      style={[
        styles.container,
        {
          borderTopWidth: index === 0 ? 0.7 : 0,
        },
      ]}>
      <View style={styles.header}>
        <CustomText
          variant="h8"
          fontFamily={Fonts.Medium}
          style={styles.orderId}>
          #{item.orderId}
        </CustomText>
        <CustomText
          variant="h8"
          fontFamily={Fonts.Medium}
          style={[
            styles.status,
            {
              color:
                item.status === 'completed'
                  ? '#4CAF50'
                  : '#FF9800',
            },
          ]}>
          {item.status}
        </CustomText>
      </View>
      <View style={styles.body}>
        <View style={styles.itemsList}>
          {item?.items?.map((i, idx) => (
            <CustomText
              variant="h8"
              fontFamily={Fonts.Medium}
              key={idx}
              style={styles.itemText}>
              {i.count} x {i.item.name}
            </CustomText>
          ))}
        </View>
        <View style={styles.priceSection}>
          <CustomText
            variant="h5"
            fontFamily={Fonts.SemiBold}
            style={styles.priceText}>
            ₹{item.totalPrice}
          </CustomText>
          <CustomText variant="h9" style={styles.dateText}>
            {formatISOToCustom(item.createdAt)}
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.7,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    color: '#424242',
    fontSize: 16,
  },
  status: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemsList: {
    width: '60%',
  },
  itemText: {
    color: '#616161',
    marginBottom: 5,
  },
  priceSection: {
    alignItems: 'flex-end',
    width: '40%',
  },
  priceText: {
    color: '#212121',
    fontSize: 18,
    marginBottom: 5,
  },
  dateText: {
    color: '#757575',
    fontSize: 12,
  },
});

export default OrderItem;
