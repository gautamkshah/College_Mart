import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { adData, categories } from '@utils/dummyData'
import AdCourasel from '@components/dashboard/AdCourasel'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import CategoryContainer from '@components/dashboard/CategoryContainer'

const Content = () => {
  return (
    <View style={styles.constiner}>
      <AdCourasel adData={adData}/>
      <CustomText variant='h5' fontFamily={Fonts.SemiBold}>
        Grocery & Kitchen
      </CustomText>
      <CategoryContainer data={categories}/>
    </View>
  )
}


const styles=StyleSheet.create({
  constiner:{
    paddingHorizontal:20
  }
})
export default Content