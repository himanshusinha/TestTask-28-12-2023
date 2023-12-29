import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import colors from '../../../constants/colors';
import images from '../../../constants/images';
import {moderateScale, textScale} from '../../../styles/responsiveSize';
import {onBoardingData} from '../../../constants/list';
import fontFamily from '../../../styles/fontFamily';
import routes from '../../../constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ripple from 'react-native-material-ripple';

const {width, height} = Dimensions.get('window');

const Slide = ({item}) => {
  return (
    <View style={styles.slideContainer}>
      <Image resizeMode="contain" source={item?.image} style={styles.image} />

      <Text style={styles.title}>{item?.title}</Text>
      <Text style={styles.subtitle}>{item?.subtitle}</Text>
    </View>
  );
};
const skip = () => {};

const OnboardingScreen = ({navigation}) => {
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        let onboardingCompleted = await AsyncStorage.getItem(
          'onboardingCompleted',
        );

        console.log('Onboarding status:', onboardingCompleted);

        if (onboardingCompleted === null) {
          onboardingCompleted = 'false';
        }

        if (onboardingCompleted === 'true') {
          navigation.replace(routes.LOGIN_SCREEN);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };

    checkOnboardingStatus();
  }, [navigation]);

  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = async () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== onBoardingData.length) {
      const offset = nextSlideIndex * width;
      ref.current.scrollToOffset({offset});
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      try {
        await AsyncStorage.setItem('onboardingCompleted', 'true');
        console.log('Onboarding status set to completed');
        navigation.replace(routes.LOGIN_SCREEN);
      } catch (error) {
        console.error('Error setting onboarding status:', error.message); // Log the error message
      }
    }
  };
  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.14,
          justifyContent: 'space-between',
          paddingHorizontal: moderateScale(20),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: moderateScale(150),
          }}>
          {onBoardingData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: colors.BLACK,
                  width: moderateScale(25),
                },
              ]}
            />
          ))}
        </View>

        {/* Render buttons */}
        <View style={{marginTop: moderateScale(30)}}>
          {currentSlideIndex == onBoardingData.length - 1 ? (
            <View style={{height: moderateScale(40)}}>
              <Ripple
                onPress={() => navigation.replace(routes.LOGIN_SCREEN)}
                style={styles.btn}>
                <TouchableOpacity>
                  <Text
                    style={{
                      fontSize: textScale(15.31),
                      color: colors.WHITE,
                      fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                    }}>
                    Get Started
                  </Text>
                </TouchableOpacity>
              </Ripple>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                bottom: 0,
              }}>
              <Ripple
                onPress={skip}
                style={[
                  styles.btn,
                  {
                    backgroundColor: colors.GRAY_SECONDARY,
                    borderRadius: moderateScale(13),
                  },
                ]}>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text style={styles.skipTitle}>Skip</Text>
                </TouchableOpacity>
              </Ripple>

              <View style={styles.viewStyle} />
              <Ripple onPress={goToNextSlide} style={styles.btn}>
                <TouchableOpacity activeOpacity={0.8}>
                  <Text style={styles.titleSyle}>Next</Text>
                </TouchableOpacity>
              </Ripple>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <ImageBackground
        style={{flex: 0.9, bottom: moderateScale(20)}}
        resizeMode="contain"
        source={images.onBoarding_bg}>
        <FlatList
          bounces={false}
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={onBoardingData}
          pagingEnabled
          renderItem={({item}) => <Slide item={item} />}
        />
        <Footer />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: colors.BLACK,
    fontSize: textScale(13),
    marginTop: moderateScale(10),
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: moderateScale(23),
    top: moderateScale(30),
  },
  title: {
    color: colors.WHITE,
    fontSize: textScale(18.31),
    fontWeight: 'bold',
    textAlign: 'center',
    top: moderateScale(28),
    color: colors.BLACK,
  },

  image: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  indicator: {
    height: moderateScale(12),
    width: moderateScale(12),
    backgroundColor: colors.GRAY,
    marginHorizontal: moderateScale(3),
    borderRadius: moderateScale(6),
    bottom: moderateScale(18),
  },
  btn: {
    flex: 1,
    height: moderateScale(40),
    borderRadius: moderateScale(13),
    backgroundColor: colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: moderateScale(20),
  },
  slideContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.68,
    width: width * 1,
    top: moderateScale(160),
  },
  titleSyle: {
    fontSize: textScale(15.31),
    color: colors.WHITE,
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
  },
  skipTitle: {
    fontSize: textScale(15.31),
    color: colors.BLACK,
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
  },

  viewStyle: {width: moderateScale(15)},
});
export default OnboardingScreen;
