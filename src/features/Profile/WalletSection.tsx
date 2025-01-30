import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '@utils/Constants';
import WalletItem from './WalletItem';

const WalletSection = () => {
  return (
    <View style={styles.walletContainer}>
      <WalletItem icon="wallet-outline" label="Wallet" />
      <WalletItem icon="chatbubble-ellipses-outline" label="Support" />
      <WalletItem icon="card-outline" label="Payments" />
    </View>
  );
};

const styles = StyleSheet.create({
  walletContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingVertical: 15,
    borderRadius: 15,
  },
});

export default WalletSection;
