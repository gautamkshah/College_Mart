import {View, Text, Alert, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {useState} from 'react';
import {printNavigationStack, resetAndNavigate} from '@utils/NavigationUtils';
import {deliveryLogin} from '@service/authService';
import CustomSafeAreView from '@components/global/CustomSafeAreView';
import {TextInput, Button} from 'react-native';
import {ScrollView} from 'react-native';
import {screenHeight} from '@utils/scalling';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import CustomInput from '@components/ui/Custominput';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';

const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handlelogin = async () => {
    setLoading(true);
    try {
      await deliveryLogin(email, password);
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <CustomSafeAreView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              autoPlay
              loop
              source={require('@assets/animations/delivery_man.json')}
              style={styles.lottie}
            />
          </View>
          <CustomText variant="h3" fontFamily={Fonts.Bold}>
            {' '}
            Delivery Partner Portal
          </CustomText>
          <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
            {' '}
            Faster than Flash
          </CustomText>
          <CustomInput
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            left={
              <Icon
                name="mail"
                color={'#FF890E'}
                size={RFValue(18)}
                style={{marginLeft: 10}}
              />
            }
            inputMode="email"
            right={false}
          />
          <CustomInput
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            left={
              <Icon
                name="key-sharp"
                color={'#FF890E'}
                size={RFValue(18)}
                style={{marginLeft: 10}}
              />
            }
            secureTextEntry
            right={false}
          />
          <CustomButton
            title="Login"
            onPress={handlelogin}
            loading={loading}
            disabled={email.length == 0 || password.length < 4}
          />
        </View>
      </ScrollView>
    </CustomSafeAreView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: '100%',
    opacity: 0.8,
  },
});

export default DeliveryLogin;
