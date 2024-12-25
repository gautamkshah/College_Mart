import { View, Text, Animated as RNAnimated, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useAuthStorage } from '@state/authStorage'
import NoticeAnimmation from './NoticeAnimmation'
import { NoticeHeight } from '@utils/scalling'
import { SlideInDown } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native'
import Visuals from './Visuals'
import { CollapsibleContainer, CollapsibleHeaderContainer, CollapsibleScrollView, withCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
const NOTICE_HEIGHT = -(NoticeHeight + 12)
import AnimatedHeader from './AnimatedHeader'
import StickySearchBar from './StickySearchBar'
import Content from './Content'
import CustomText from '@components/ui/CustomText'
import { RFValue } from 'react-native-responsive-fontsize'
import { Fonts } from '@utils/Constants'

const ProductDashboard = () => {
  const NoticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current
  console.log(NoticePosition)
  const slideUp = () => {
    RNAnimated.timing(NoticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 300,
      useNativeDriver: false
    }).start()
  }
  const slideDown = () => {
    RNAnimated.timing(NoticePosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false
    }).start()
  }

  useEffect(() => {
    slideDown()
    const timeoutid = setTimeout(() => {
      slideUp()
    }, 3500)
    return () => clearTimeout(timeoutid)
  }, [])



  return (
    <NoticeAnimmation noticePosition={NoticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
        <CollapsibleContainer style={style.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={style.transparent}>
            <AnimatedHeader showNotice={() => {
              slideDown()
              const timeoutId = setTimeout(() => {
                slideUp()
              }, 3500)
              return () => clearTimeout(timeoutId)
            }} />
            <StickySearchBar />

          </CollapsibleHeaderContainer>

          <CollapsibleScrollView nestedScrollEnabled style={style.panelContainer} showsVerticalScrollIndicator={false}>

            <Content />
            <View style={{ backgroundColor: '#F8F8F8', padding: 20 }}>
              <CustomText variant='h1' fontFamily={Fonts.Bold} style={{ opacity: 0.2 }}>
                Your last minute App 🥭
              </CustomText>
              <CustomText  fontFamily={Fonts.Bold} style={{ marginTop:10, paddingBottom:100,opacity: 0.2 }}>
                Developed by ❤️ Gautam 
              </CustomText>

            </View>




          </CollapsibleScrollView>

        </CollapsibleContainer>

      </>
    </NoticeAnimmation>

  )
}

const style = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent'
  }
})

export default withCollapsibleContext(ProductDashboard)