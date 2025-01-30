import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';

interface TabBarProps {
  selectedTab: 'available' | 'delivered';
  onTabChange: (tab: 'available' | 'delivered') => void;
}

const TabBar: FC<TabBarProps> = ({selectedTab, onTabChange}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onTabChange('available')}
        style={[styles.tab, selectedTab === 'available' && styles.activeTab]} onPressIn={()=> onTabChange('available')}>
        <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={[styles.tabtext,selectedTab==='available' ? styles.activeTabText: styles.inactiveTab]}> Available</CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onTabChange('delivered')}
        style={[styles.tab, selectedTab !== 'available' && styles.activeTab]} onPressIn={()=> onTabChange('delivered')}>
        <CustomText variant='h8' fontFamily={Fonts.SemiBold} style={[styles.tabtext,selectedTab!=='available' ? styles.activeTabText: styles.inactiveTab]}> Delivered</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    width: '38%',
    margin: 10,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  tabtext: {
    color: Colors.text,
  },
  activeTabText: {
    color: 'white',
  },
  inactiveTab: {
    color: Colors.disabled,
  },
});

export default TabBar;
