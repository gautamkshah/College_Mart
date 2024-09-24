import { View, Text, ViewStyle, SafeAreaView, StyleSheet } from 'react-native'
import React, { FC, ReactNode, ReactNodeArray } from 'react'


interface CustomSafeAreViewProps {
    children: ReactNode,
    style?: ViewStyle 
}

const CustomSafeAreView: FC<CustomSafeAreViewProps> = ({children,style}) => {
  return (
    <SafeAreaView style={[styles.contianer,style]}>
        <View style ={[styles.contianer,style]}>{children}</View>

    </SafeAreaView>
  )
}

const styles =StyleSheet.create({
    contianer:{
        flex:1,
        backgroundColor:'#fff'
    }
})

export default CustomSafeAreView