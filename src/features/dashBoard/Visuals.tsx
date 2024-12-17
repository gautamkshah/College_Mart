import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import Animated from 'react-native-reanimated'
import LinearGradient from 'react-native-linear-gradient'
import { darkWeatherColors } from '@utils/Constants'
import { screenHeight, screenWidth } from '@utils/scalling'
import { Image } from 'react-native'
import LottieView from 'lottie-react-native'

const Visuals:FC = () => {



  return (
    <Animated.View style={[styles.container]}>
      <LinearGradient colors={darkWeatherColors} style = {styles.gradient} />
      <Image source={require('@assets/images/cloud.png')} style={styles.cloud} />
      <LottieView autoPlay={true} enableMergePathsAndroidForKitKatAndAbove={true} source={require('@assets/animations/raining.json')} style={styles.lottie} />
    </Animated.View>
  )
}

const styles=StyleSheet.create({
      container:{
            position:'absolute'
      },
      lottie:{
            width:'100%',
            height:150,
            position:'absolute',
            transform:[{scaleX:-1}]
      },
      gradient:{
            position:'absolute',
            width:'100%',
            height: screenHeight* 0.4
      },
      cloud:{
            width:screenWidth,
            resizeMode:'stretch',
            height:100
      }
})

export default Visuals