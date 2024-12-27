import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { useCartStore } from '@state/cartStore'
import { Colors } from '@utils/Constants'

const UniversalAdd :FC<{item:any}>= ({item}) => {
      const count= useCartStore((state)=> state.getItemCount(item._id))
      const {addItem,removeItem}= useCartStore()
  return (
    <View style={[styles.container,{backgroundColor: count===0? 'white':Colors.secondary}]}>
      <Text>UniversalAdd</Text>
    </View>
  )
}

const styles=StyleSheet.create({
      container:{
            alignItems:'center',
            justifyContent:'center',
            borderWidth:1,
            borderColor: Colors.secondary,
            width:65,
            borderRadius:10
      }
})

export default UniversalAdd