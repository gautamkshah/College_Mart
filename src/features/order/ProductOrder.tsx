import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React, { FC } from 'react'
import CustomHeader from '@components/ui/CustomHeader'
import { Colors } from '@utils/Constants'
import OrderList from './OrderList'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '@components/ui/CustomText'

const ProductOrder :FC= () => {
  return (
    <View style={styles.constainer}>
      <CustomHeader title='Checkout' search={false} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
            <OrderList/>
            <View style={styles.flexRowBetween}>
                  <View style={styles.flexRow}>
                        <Image source={require('@assets/icons/coupon.png')} style={{width: 25, height: 25}}/>
                        <CustomText variant='h8' style={{opacity:0.8}}>Apply Coupon</CustomText>
                  </View>
                  <Icon name='chevron-right' size={RFValue(16)} color={Colors.text}/>
            </View>

            {/* <BillDetails totalItemPrice={totalItemPrice} /> */}

      </ScrollView>
      
    </View>
  )
}

const styles = StyleSheet.create({
      constainer:{
            flex:1,
            backgroundColor:'white'

      },
      scrollContainer:{
            backgroundColor:Colors.backgroundSecondary,
            padding:10,
            paddingBottom: 250,

      },
      flexRowBetween:{
            backgroundColor:'white',
            alignItems:'center',
            justifyContent:'space-between',
            padding:10,
            flexDirection:'row',
            borderRadius:15,
      },
      flexRow:{
            alignItems:'center',
            flexDirection:'row',
            gap:10
      }

})

export default ProductOrder