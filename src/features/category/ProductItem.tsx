import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {screenHeight} from '@utils/scalling';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors, Fonts} from '@utils/Constants';
import UniversalAdd from '@components/ui/UniversalAdd';

const ProductItem: FC<{item: any; index: number}> = ({index, item}) => {
  const isSecondCol = index % 2 != 0;

  return (
    <View style={[styles.container, {marginLeft: isSecondCol ? 10 : 0}]}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.flexrow}>
          <Image
            source={require('@assets/icons/clock.png')}
            style={styles.clockicon}
          />
          <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Medium}>
            8 min
          </CustomText>
        </View>
        <CustomText variant="h8" numberOfLines={2} fontFamily={Fonts.Medium}>
          {item.name}
        </CustomText>
        <View style={styles.priceContainer}>
          <View>
            <CustomText variant="h8" fontFamily={Fonts.Medium}>
            ₹{item?.price}
            </CustomText>
            <CustomText variant="h8" style={{opacity:0.8, textDecorationLine: 'line-through'}} fontFamily={Fonts.Medium}>
            ₹{item?.discountPrice}
            </CustomText>
          </View>
          <UniversalAdd  item={item}/>
        </View>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    aspectRatio: 1 / 1,
  },
  imageContainer: {
    height: screenHeight * 0.14,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  flexrow: {
    flexDirection: 'row',
    padding: 2,
    borderRadius: 4,
    backgroundColor: Colors.backgroundSecondary,
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 2,
  },
  clockicon: {
    height: 15,
    width: 15,
  },
  priceContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 'auto',
  }
});

export default ProductItem;
