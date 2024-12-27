import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '@utils/Constants';

interface SidebarProps {
  selectedCategory: any;
  categories: any;
  onCategoryPress: (category: any) => void;
}

const Sidebar: FC<SidebarProps> = ({
  categories,
  selectedCategory,
  onCategoryPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const indicatorPosition = useSharedValue(0);
  const animatedValues = categories?.map(() => useSharedValue(0));

  useEffect(() => {
    console.log(selectedCategory);
    let targetIndex = -1;
    categories?.forEach((category: any, index: number) => {
      const isSelected = selectedCategory?._id === category._id;
      animatedValues[index].value = withTiming(isSelected ? 2 : -15, {
        duration: 500,
      });
      if (isSelected) {
        targetIndex = index;
      }
    });
    

    if (targetIndex !== -1) {
      indicatorPosition.value = withTiming(targetIndex * 100, {duration: 500});
      runOnJS(() => {
        scrollViewRef.current?.scrollTo({y: targetIndex * 100, animated: true});
      });
    }
  }, [selectedCategory]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{translateY: indicatorPosition.value}],
  }));

  return (
    <View style={styles.sidebar}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.indicator, indicatorStyle]} />

        <Animated.View>
          {categories?.map((category: any, index: number) => {
            const animatedStyle = useAnimatedStyle(() => ({
              bottom: animatedValues[index].value,
            }));
            return (
              <TouchableOpacity
                onPress={() => onCategoryPress(category)}
                key={index}
                activeOpacity={1}
                style={styles.categoryButtom}>
                <View
                  style={[
                    styles.imageContainer,
                    selectedCategory?.id === category._id &&
                      styles.selectedImageContainer,
                  ]}>
                  <Animated.Image
                    source={{uri: category.image}}
                    style={[styles.image, animatedStyle]}
                  />
                </View>
                <CustomText fontSize={RFValue(7)} style={{textAlign: 'center'}}>
                  {category?.name}
                </CustomText>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: '24%',
    backgroundColor: 'white',
    borderRightWidth: 0.8,
    borderRightColor: '#eee',
    position: 'relative',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: 'hidden',
    marginVertical: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  selectedImageContainer: {
    backgroundColor: '#fff',
  },
  indicator: {
    position: 'absolute',
    right: 0,
    width: 4,
    height: 80,
    top: 10,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  categoryButtom: {
    width: '100%',
    height: 100, // Ensure this matches the `targetIndex * 100` calculation
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Sidebar;
