import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'



const DeliveryDetails:FC <{details:any}>= ({details}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
            <View style={styles.iconConatiner}>
                  <Icon name='bike-fast' color={Colors.disabled} size={RFValue(20)}/>
            </View>
            <View>
                  <CustomText variant='h5' fontFamily={Fonts.SemiBold}>Your delivery details.</CustomText>
                  <CustomText variant='h8' fontFamily={Fonts.Medium} >Details of your current order</CustomText>
            </View>
      </View>

      <View style={styles.flexrow2}>
            <View style={styles.iconConatiner}>
                  <Icon name='map-marker-outline' color={Colors.disabled} size={RFValue(20)}/>
            </View>
            <View style={{width: '80%'}}>
                  <CustomText variant='h5' fontFamily={Fonts.SemiBold}>Delivery at Home</CustomText>
                  <CustomText variant='h8' numberOfLines={2} fontFamily={Fonts.Medium} > {details?.address || "No address found"}</CustomText>
            
            </View>
      </View>
      <View style={styles.flexrow2}>
            <View style={styles.iconConatiner}>
                  <Icon name='phone-outline' color={Colors.disabled} size={RFValue(20)}/>
            </View>
            <View style={{width: '80%'}}>
                  <CustomText variant='h5' fontFamily={Fonts.SemiBold}>{details?.name  || "-" } {details?.phone}</CustomText>
                  <CustomText variant='h8' fontFamily={Fonts.Medium} >Receivers contact number</CustomText>
            </View>
      </View>
    </View>
  )
}

const styles= StyleSheet.create({
      container:{
            width: '100%',
            borderRadius: 15,
            marginVertical: 15,
            paddingVertical: 15,
            backgroundColor: 'white',
      },
      flexRow:{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            padding: 10,
            borderBottomWidth: 0.75,
            borderColor: Colors.border,
      },
      flexrow2:{
            flexDirection: 'row',
            gap:10,
            alignItems: 'center',
            padding: 10,
      },
      iconConatiner:{
            backgroundColor: Colors.backgroundSecondary,
            padding: 10,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
      }
})

export default DeliveryDetails