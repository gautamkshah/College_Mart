import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import { FC } from 'react'
import CustomText from '@components/ui/CustomText'
import { Fonts } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAuthStorage } from '@state/authStorage'
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import { navigate } from '@utils/NavigationUtils'


const Header:FC <{showNotice:()=>void }> = ({showNotice}) => {
      const {setUser , user} = useAuthStorage()
  return (
    <View style={style.subcontainer}>
      <TouchableOpacity activeOpacity={0.8}>
           <CustomText fontFamily={Fonts.Bold} variant='h8' style={style.text}>
            Delivery in
           </CustomText>
           <View style={style.flexrowgap}>
            <CustomText fontFamily={Fonts.SemiBold} variant='h2' style={style.text}>
                  10 minutes
            </CustomText>
            <TouchableOpacity style={style.noticebutton} onPress={showNotice}>
                  <CustomText fontSize={RFValue(5)} fontFamily={Fonts.SemiBold} style={{color:'#3B4886'}}>
                   🌧️ Rain
                  </CustomText>
            </TouchableOpacity>
           </View>

           <View style={style.flexrow}>
            <CustomText variant='h8' numberOfLines={1} fontFamily={Fonts.Medium} style={style.text2}>
                  {user?.address || 'Knowwhere Somewhere'}
            </CustomText>
            <Icon name='menu-down' color='#fff' size={RFValue(20)} style={{bottom:-1}}/>

           </View>

      </TouchableOpacity>
      <TouchableOpacity onPress={()=> navigate('Profile')}>
            <Icon name='account-circle-outline' size={RFValue(36)} color='#fff'/>   
            
      </TouchableOpacity>
      
    </View>
  )
}

const style=StyleSheet.create({
      subcontainer:{
            flexDirection:'row',
            alignItems:'center',
            paddingHorizontal: 10,
            paddingTop: Platform.OS === 'ios' ? 5 : 10,
            justifyContent: 'space-between',
      },
      text:{
            color:'fff',
      },
      flexrowgap:{
            flexDirection:'row',
            alignItems:'center',
            gap: 5,
      },
      noticebutton:{
            paddingHorizontal:8,
            paddingVertical: 2,
            bottom:-2,
            borderRadius: 100,
            backgroundColor:'#E8EAF5'
      },
      text2:{
            width: '90%',
            textAlign:'center',
            color:'#fff',
      },
      flexrow:{
            justifyContent:'center',
            alignItems:'center',
            gap: 2,
            flexDirection:'row',
            width: '70%'
      }

})

export default Header