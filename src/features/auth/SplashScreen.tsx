import { View, Text, Alert } from 'react-native'
import React, { FC, useEffect } from 'react'
import { Colors } from '@utils/Constants'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import { screenHeight } from '@utils/scalling'
import Logo from '@assets/images/splash_logo.jpeg'
import GeoLocation from '@react-native-community/geolocation'
import { useAuthStorage } from '@state/authStorage'
import { tokenStorage } from '@state/storage'
import { resetAndNavigate } from '@utils/NavigationUtils'
import { jwtDecode } from 'jwt-decode'
import { refetchUser, refresh_tokens } from '@service/authService'


interface DecodedToken {
  exp: number,
}

GeoLocation.setRNConfiguration({ skipPermissionRequests: true, authorizationLevel: 'always', enableBackgroundLocationUpdates: true, locationProvider: 'auto' })

const SplashScreen: FC = () => {

  const { user, setUser } = useAuthStorage()

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken') as string
    const refreshToken = tokenStorage.getString('refreshToken') as string
    if (accessToken) {
      const decodedAccessToken = jwtDecode<DecodedToken>(accessToken)
      const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken)

      const currentTime = Date.now() / 1000
      if (decodedRefreshToken?.exp < currentTime) {
        resetAndNavigate("CustomerLogin")
        Alert.alert("Session Expired ,Login again")
        return false
      }
      if (decodedAccessToken?.exp < currentTime) {
        try {
          refresh_tokens()
          // await refetchUser(setUser)


        }
        catch (e) {
          console.log("Token Expired", e)
          Alert.alert("Error in refreshing token")
          return false
        }

      }

      if(user?.role=="customer"){
        resetAndNavigate("ProductDashboard")
      }else {
        
      }

  
      return true


    }
    resetAndNavigate("CustomerLogin")
    return false
  }


  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        GeoLocation.requestAuthorization()
        tokenCheck()

      }
      catch (e) {
        console.log(e)
        Alert.alert("Sorry we need your location service to give you better shopping experience.")
      }
    }
    const timeoutId = setTimeout(fetchUserLocation, 1000)
    return () => clearTimeout(timeoutId)
  }
    , [])

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: screenHeight * 0.4,
    width: screenHeight * 0.7,
    resizeMode: 'contain'
  }
})

export default SplashScreen