import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {FC} from 'react';
import {useCartStore} from '@state/cartStore';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';

const UniversalAdd: FC<{item: any}> = ({item}) => {
  const count = useCartStore(state => state.getItemCount(item._id));
  const {addItem, removeItem} = useCartStore();

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: count === 0 ? 'white' : Colors.secondary},
      ]}>
      {count === 0 ? (
        <Pressable onPress={() => addItem(item)} style={styles.add}>
          <CustomText variant="h9" fontFamily={Fonts.SemiBold}>
            Add{' '}
          </CustomText>
        </Pressable>
      ) : (
        <View style={styles.counterCounter}>
          <Pressable onPress={() => removeItem(item._id)}>
            <Icon name="minus" color="#fff" size={RFValue(13)} />
          </Pressable>
          <CustomText variant="h6" style={{color: '#fff'}}>
            {count}
          </CustomText>
          <Pressable onPress={() => addItem(item)}>
            <Icon name="plus" color="#fff" size={RFValue(13)} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.secondary,
    width: 65,
    borderRadius: 10,
  },
  add: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 6,
    paddingBottom: 4,
  },
  counterCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 6,
    justifyContent: 'space-between',
  },
});

export default UniversalAdd;
