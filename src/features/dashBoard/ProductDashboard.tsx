import {
  View,
  Text,
  Animated as RNAnimated,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import NoticeAnimmation from './NoticeAnimmation';
import {NoticeHeight, screenHeight} from '@utils/scalling';
import Animated, {
  SlideInDown,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';

const NOTICE_HEIGHT = -(NoticeHeight + 12);
import AnimatedHeader from './AnimatedHeader';
import StickySearchBar from './StickySearchBar';
import Content from './Content';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts} from '@utils/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import withCart from '@features/cart/withCart';
import withLiveStatus from '@features/map/withLiveStatus';

const ProductDashboard: FC = () => {
  const {scrollY, expand} = useCollapsibleContext();
  const previousScroll = useRef<number>(0);

  const backtotopstyle = useAnimatedStyle(() => {
    const isscrollingup =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isscrollingup ? 1 : 0, {duration: 300});
    const translateY = withTiming(isscrollingup ? 0 : 10, {duration: 300});

    previousScroll.current = scrollY.value;
    return {opacity, transform: [{translateY}]};
  });



  const NoticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RNAnimated.timing(NoticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(NoticePosition, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutid = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeoutid);
  }, []);

  return (
    <NoticeAnimmation noticePosition={NoticePosition}>
      <>
        <Visuals />
        <SafeAreaView />

        <Animated.View style={[style.backtotopbutton, backtotopstyle]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
            style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Icon
              name="arrow-up-circle-outline"
              color={'#fff'}
              size={RFValue(12)}
            />
            <Text>
              <CustomText
                variant="h9"
                style={{color: '#fff'}}
                fontFamily={Fonts.SemiBold}>
                Back to Top
              </CustomText>
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <CollapsibleContainer style={style.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={style.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            />
            <StickySearchBar />
          </CollapsibleHeaderContainer>

          <CollapsibleScrollView
            nestedScrollEnabled
            style={style.panelContainer}
            showsVerticalScrollIndicator={false}>
            <Content />
            <View style={style.footer}>
              <CustomText
                variant="h5"
                fontFamily={Fonts.Bold}
                style={style.footerText}>
                Your last minute App 🥭
              </CustomText>
              <CustomText
                variant="body"
                fontFamily={Fonts.Regular}
                style={[style.footerText, style.footerSubText]}>
                Developed by ❤️ Gautam
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimmation>
  );
};

const style = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backtotopbutton: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },

  footer: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    color: '#333',
    fontSize: RFValue(14),
    fontFamily: Fonts.Regular,
    textAlign: 'center',
    opacity: 0.8,
  },
  footerSubText: {
    marginTop: 8,
    fontSize: RFValue(12),
    opacity: 0.6,
  },
});

export default withLiveStatus(
  withCart(withCollapsibleContext(ProductDashboard)),
);
