import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useCartStore } from '@state/cartStore'
import CustomText from '@components/ui/CustomText'
import { Colors, Fonts } from '@utils/Constants'
import OrderItem from './OrderItem'

const OrderList = () => {
      const cartItems= useCartStore((state) => state.cart)
      const totalItems= cartItems?.reduce((acc, item) => acc + item.count, 0)
  return (
    <View style={styles.container}>
      <View style={styles.flexrow}>
            <View style={styles.imageContainer}>
                  <Image source={require('@assets/icons/clock.png')} style={styles.image}/>
            </View>
            <View>
                  <CustomText variant='h5' fontFamily={Fonts.SemiBold} > Delivery in 10 minutes. </CustomText>
                  <CustomText variant='h8' style={{opacity:0.8}} fontFamily={Fonts.SemiBold}> Shipment of {totalItems || 0} items </CustomText>
            </View>

      </View>
      {cartItems?.map((item, index) => {
            return (
                  <OrderItem key={item._id} item={item} />
            )
      })
      }
      
    </View>
  )
}

const styles= StyleSheet.create({
      container:{
            backgroundColor:'white',
            borderRadius:15,
            marginBottom:15
      },
      flexrow:{
            alignItems:'center',
            flexDirection:'row',
            gap: 12,
            paddingHorizontal:10,
            paddingVertical: 12
      },
      imageContainer:{
            backgroundColor:Colors.backgroundSecondary,
            padding:10,
            borderRadius:15,
      },
      image:{
            width:30,
            height:30
      }
})


export default OrderList