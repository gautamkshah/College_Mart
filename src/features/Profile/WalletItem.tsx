import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Colors, Fonts } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'

const WalletItem :FC<{ icon:string,label:string }>= ({icon,label}) => {
  return (
    <View style={styles.continer}>
      <Icon name={icon} color={Colors.text} size={RFValue(20)}/>
      <CustomText variant='h8' fontFamily={Fonts.Medium} >
        {label}
      </CustomText>
    </View>
  )
}

const styles=StyleSheet.create({
      continer:{
            alignItems:'center',
      }
})

export default WalletItem