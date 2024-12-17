import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { FC } from 'react'
import { NoticeHeight } from '@utils/scalling'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import Svg, { Defs, Use } from 'react-native-svg'
import { wavyData } from '@utils/dummyData'
import { Path } from 'react-native-svg'
import { G } from 'react-native-svg'

const Notice: FC = () => {
  return (
    <View style={{ height: NoticeHeight }}>
      <View style={styles.container}>
        <View style={styles
          .noticeContainer
        }>
          <SafeAreaView style={{ padding: 8 }}>
            <CustomText style={styles.heading} variant='h7' fontFamily={Fonts.SemiBold}>
              It's raining near this location.
            </CustomText>
            <CustomText variant='h8' style={styles.textCenter}>
              Our delivery partners may take longer to reach you.
            </CustomText>

          </SafeAreaView>
        </View>
      </View>
      <Svg
        width='100%'
        height='35'
        fill='#CCD5E4'
        viewBox='0 0 4000 1000'
        preserveAspectRatio='none'
        style={styles.wave}>
        <Defs>
          <Path id='wavepath' d={wavyData} />
        </Defs>
        <G>
        <Use href="#wavepath" y="321" />
      </G>
      </Svg>
     
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#CCD5E4'
  },
  noticeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCD5E4',
  },
  heading: {
    marginBottom: 8,
    color: '#2D3875',
    textAlign: 'center'
  },
  textCenter: {
    marginBottom: 2,
    textAlign: 'center'
  },
  wave: {
    width: '100%',
    transform: [{ rotateX: '180deg' }]
  }
})

export default Notice