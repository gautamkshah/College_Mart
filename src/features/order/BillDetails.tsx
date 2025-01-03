import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';

const ReportItem: FC<{
  iconName: string;
  underline?: boolean;
  title: string;
  price: number;
}> = ({iconName, underline, title, price}) => {
  return (
    <View style={[styles.flexRowBetween, {marginBottom: 10}]}>
      <View style={styles.flexRow}>
        <Icon
          name={iconName}
          style={{opacity: 0.7}}
          size={RFValue(12)}
          color={Colors.text}
        />
        <CustomText
          variant="h8"
          style={{
            textDecorationLine: underline ? 'underline' : 'none',
            textDecorationColor: Colors.primary,
          }}>
          {title}
        </CustomText>
      </View>
      <CustomText variant="h8">₹{price}</CustomText>
    </View>
  );
};



const BillDetails: FC<{totalItemPrice: number}> = ({totalItemPrice}) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text} fontFamily={Fonts.SemiBold}>
        Bill Details
      </CustomText>
      <View style={styles.billcontainer}>
      <ReportItem iconName='article' title='Items Total' price={totalItemPrice} underline={false}/>
      <ReportItem iconName='pedal-bike' title='Delivery Charge' price={34} underline={false}/>
      <ReportItem iconName='shopping-bag' title='Handling Charges' price={2} underline={false}/>
      <ReportItem iconName='cloudy-snowing' title='Surge Charge' price={6} underline={false}/>
      </View>
      <View style={[styles.flexRowBetween, {marginBottom: 15}]}>
        <CustomText variant="h8" fontFamily={Fonts.SemiBold}>
          Total Price
        </CustomText>
        <CustomText variant="h8">₹{totalItemPrice + 40}</CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    marginVertical: 15,
  },
  text: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  billcontainer: {
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.7,
  },
  flexRowBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default BillDetails;
