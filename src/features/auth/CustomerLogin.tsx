import { View, Text, StyleSheet, Animated, Image, Keyboard } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Gesture, GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler'
import CustomSafeAreView from '@components/global/CustomSafeAreView'
import ProductsSlider from '@components/login/ProductsSlider'
import { resetAndNavigate } from '@utils/NavigationUtils'
import CustomText from '@components/ui/CustomText'
import { Fonts, lightColors } from '@utils/Constants'
import CustomInput from '@components/ui/Custominput'
import CustomButton from '@components/ui/CustomButton'
import useKeyboardOffsetHeight from '@utils/usekeyboardOffsetheight'
import LinearGradient from 'react-native-linear-gradient'
import { customerLogins } from '@service/authService'


const bottomColors = [...lightColors].reverse()

const CustomerLogin: FC = () => {

    const [phoneNumber, setPhoneNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const [gestureSequence, setGestureSequence] = useState<string[]>([])
    const keyboardOffsetHeight = useKeyboardOffsetHeight()
    const animatedValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (keyboardOffsetHeight == 0) {
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }).start()
        }
        else {
            Animated.timing(animatedValue, {
                toValue: -keyboardOffsetHeight * 0.84,
                duration: 400,
                useNativeDriver: true
            }).start()
        }

    }, [keyboardOffsetHeight])


    const handleAuth = async () => {
        Keyboard.dismiss()
        setLoading(true)
        try{
            // await customerLogins(phoneNumber)
            resetAndNavigate('ProductDashboard')
        }catch(e){
            console.log("Loading Failed",e)

        }finally{
            setLoading(false)
        }
    }
    const handleGesture = ({ nativeEvent }: any) => {
        if (nativeEvent.state === State.END) {
            const { translationX, translationY } = nativeEvent
            let direction = ''
            if (Math.abs(translationX) > Math.abs(translationY)) {
                if (translationX > 0) {
                    direction = 'right'
                } else {
                    direction = 'left'
                }
            } else {
                if (translationY > 0) {
                    direction = 'down'
                } else {
                    direction = 'up'
                }
            }
            console.log(translationX, translationY, direction)

            const newSequence = [...gestureSequence, direction].slice(-5)
            setGestureSequence(newSequence)
            if (newSequence.join(' ') == 'up up down left right') {
                setGestureSequence([])
                resetAndNavigate('DeliveryLogin')
            }


        }
    }
    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.container}>
                <CustomSafeAreView>
                    <ProductsSlider />
                    <PanGestureHandler onHandlerStateChange={handleGesture}>
                        <Animated.ScrollView bounces={false}
                            keyboardDismissMode='on-drag'
                            keyboardShouldPersistTaps='handled'
                            contentContainerStyle={styles.subContainer}
                            style={{ transform: [{ translateY: animatedValue }] }}
                        >
                            <LinearGradient colors={bottomColors} style={styles.gradient} />

                            <View style={styles.content}>
                                <Image source={require('@assets/images/logo.png')} style={styles.logo} />
                                <CustomText variant='h2' fontFamily={Fonts.Bold}>
                                    India's last minute app
                                </CustomText>
                                <CustomText variant='h5' fontFamily={Fonts.SemiBold} style={styles.text}>
                                    Login or Signup
                                </CustomText>
                                <CustomInput onChangeText={(text) => { setPhoneNumber(text.slice(0, 10)) }}
                                    onClear={() => setPhoneNumber('')}
                                    value={phoneNumber}
                                    left={<CustomText
                                        style={styles.phoneText}
                                        variant='h6'
                                        fontFamily={Fonts.SemiBold}>
                                        +91
                                    </CustomText>}
                                    placeholder='Enter Mobile Number'
                                    inputMode='numeric'
                                />
                                <CustomButton
                                    disabled={phoneNumber.length < 10}
                                    onPress={() => handleAuth()}
                                    loading={loading}
                                    title='Continue'
                                />
                            </View>
                        </Animated.ScrollView>
                    </PanGestureHandler>
                </CustomSafeAreView>

            </View>
        </GestureHandlerRootView>
    )
}


const styles = StyleSheet.create({
    phoneText: {
        marginLeft: 10,
    },
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 20,
        marginVertical: 10
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingBottom: 20


    },
    text: {
        marginTop: 2,
        marginBottom: 25,
        opacity: 0.8,
    },
    gradient: {
        paddingTop: 60,
        width: '100%',
    }
})

export default CustomerLogin 