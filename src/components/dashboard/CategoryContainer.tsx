import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CategoryContainer = () => {
  return (
    <View>
      <Text>CategoryContainer</Text>
    </View>
  )
}

const styles= StyleSheet.create({
      conatiner:{
            marginVertical:15
      }
      ,row:{
            flexDirection:'row',
            justifyContent:'space-between',
            marginBottom:25,
            alignItems:'baseline'
      }
})

export default CategoryContainer