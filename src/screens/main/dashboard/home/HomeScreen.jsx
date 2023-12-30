import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Platform,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import colors from '../../../../constants/colors';
import Header from '../../../../components/header/Header';
import images from '../../../../constants/images';
import {
  moderateScale,
  moderateScaleVertical,
  textScale,
} from '../../../../styles/responsiveSize';
import {useDispatch} from 'react-redux';
import {clearResponse} from '../../../redux/slices/auth.slice';
import {
  bannerData,
  categoriesData,
  popularCarData,
} from '../../../../constants/list';
import fontFamily from '../../../../styles/fontFamily';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {height, width} = Dimensions.get('window');

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState('');
  const flatListRef = useRef(null);
  const autoplayInterval = 3000;
  const [data, setData] = useState(bannerData);
  const apiUrl = 'https://api.injazrent.ae/user/getAllCars';
  const [categoriesData, setCategoriesData] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [filteredCars, setFilteredCars] = useState('');

  console.log(categoriesData, '......categoriesDAta');
  useEffect(() => {
    const autoplayTimer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;

      flatListRef.current.scrollToIndex({animated: true, index: nextIndex});
      setCurrentIndex(nextIndex);
    }, autoplayInterval);

    return () => clearInterval(autoplayTimer);
  }, [currentIndex]);
  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(apiResponse => {
        if (
          apiResponse &&
          Array.isArray(apiResponse.data) &&
          apiResponse.data.length > 0
        ) {
          setCarsData(apiResponse.data);
          setFilteredCars(apiResponse.data);

          const categories = apiResponse.data
            .map(car => car.category)
            .filter((value, index, self) => self.indexOf(value) === index);
          setCategoriesData(categories);
        } else {
          console.log('No car data found in the API response.');
        }
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error.message,
          topOffset: moderateScale(90),
        });
      });
  }, []);
  const handleCategoryPress = category => {
    const filtered = carsData.filter(car => car.category === category);
    setFilteredCars(filtered);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      <View
        style={{
          height:
            Platform.OS === 'ios' ? moderateScale(120) : moderateScale(80),
          backgroundColor: colors.NAVY_BLUE,
          justifyContent: 'center',
        }}>
        <Header
          onPress={() => {
            dispatch(clearResponse());
          }}
          iconCountryFlag={images.flag}
          titleCountryName={'Dubai'}
          iconDropDown={images.dropdown}
          iconGift={images.gift}
          titleGift={'Get AED 400'}
          iconBell={images.bell}
        />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={{paddingBottom: moderateScale(10)}}
        showsVerticalScrollIndicator={false}>
        <FlatList
          ref={flatListRef}
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            setCurrentIndex(Math.round(x / width));
          }}
          horizontal
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: width,
                  height: height / 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    width: '96%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bottom: moderateScaleVertical(40),
                  }}>
                  <ImageBackground
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: moderateScale(20),
                    }}
                    source={item.image}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                      }}>
                      <Image
                        style={{
                          width: '94%',
                          height: moderateScale(176),
                          bottom: moderateScale(8),
                          borderRadius: moderateScale(10),
                          overflow: 'hidden',
                        }}
                      />
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            top: moderateScaleVertical(10),
          }}>
          {data.map((item, index) => {
            return (
              <View
                key={item.id}
                style={{
                  width: moderateScale(14),
                  height: moderateScale(5),
                  bottom: moderateScale(100),
                  borderRadius: moderateScale(5),
                  backgroundColor:
                    currentIndex === index ? colors.BLACK : colors.GRAY,
                  marginLeft: moderateScale(10),
                }}
              />
            );
          })}
        </View>
        <View
          style={{
            bottom: moderateScale(80),
          }}>
          <Text
            style={{
              fontSize: textScale(18),
              fontFamily: fontFamily.POPPINS_SEMI_BOLD,
              color: colors.NAVY_BLUE,
              marginHorizontal: moderateScale(18),
            }}>
            Top Categories
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{justifyContent: 'space-between'}}
            data={categoriesData}
            renderItem={({item}) => {
              console.log(item, '.........popular cars');
              return (
                <TouchableOpacity
                  onPress={() => handleCategoryPress(item)}
                  activeOpacity={0.8}
                  style={{
                    flexDirection: 'row',
                    marginTop: moderateScale(15),
                    marginStart: moderateScale(16),
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      resizeMode="contain"
                      source={{
                        uri:
                          Array.isArray(item.image) && item.image.length > 0
                            ? item.image[0]
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-_Q04if8V8D3_si9dRkfhuqXAOooal8mYXg&usqp=CAU', // Fallback to local image if no image from API
                      }}
                      style={{
                        width: moderateScale(100),
                        height: moderateScale(100),
                      }}
                      onError={e =>
                        console.log('Error loading image:', e.nativeEvent.error)
                      }
                    />
                    <Text
                      style={{
                        fontSize: textScale(10),
                        fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                      }}>
                      {item ? item : 'no category'}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />

          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginHorizontal: moderateScale(20),
                marginVertical: moderateScale(20),
                width: '45%',
                backgroundColor: colors.NAVY_BLUE,
                height: moderateScale(55),
                borderRadius: moderateScale(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: textScale(15),
                  color: colors.WHITE,
                  fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                }}>
                Short Term
              </Text>
              <Text
                style={{
                  fontSize: textScale(10),
                  color: colors.WHITE,
                  fontFamily: fontFamily.POPPINS_REGULAR,
                }}>
                Daily - Weekly
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                marginHorizontal: moderateScale(20),
                marginVertical: moderateScale(20),
                width: '45%',
                backgroundColor: colors.GREEN,
                height: moderateScale(52),
                borderRadius: moderateScale(5),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: textScale(15),
                  color: colors.WHITE,
                  fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                }}>
                Long Term
              </Text>
              <Text
                style={{
                  fontSize: textScale(10),
                  color: colors.WHITE,
                  fontFamily: fontFamily.POPPINS_REGULAR,
                }}>
                1 Month to 9Months
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              bottom: moderateScale(12),
              marginHorizontal: moderateScale(10),
            }}>
            <Text
              style={{
                fontSize: textScale(18),
                color: colors.NAVY_BLUE,
                fontFamily: fontFamily.POPPINS_SEMI_BOLD,
              }}>
              Popular Cars
            </Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text
                style={{
                  fontSize: textScale(14),
                  color: colors.NAVY_BLUE,
                  fontFamily: fontFamily.POPPINS_REGULAR,
                }}>
                {' View All >>'}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filteredCars}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    width: moderateScale(240),
                    height: moderateScale(300),
                    backgroundColor: colors.NAVY_BLUE,
                    marginHorizontal: moderateScale(5),
                    borderRadius: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                      fontSize: textScale(14),
                      color: colors.WHITE,
                    }}>
                    {item?.name ? item?.name : 'No name available'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamily.POPPINS_REGULAR,
                      fontSize: textScale(12),
                      color: colors.WHITE,
                    }}>
                    {`${item?.brand ? item?.brand : 'No brand'} ${
                      item?.model ? item?.model : 'No model'
                    }`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamily.POPPINS_REGULAR,
                      fontSize: textScale(12),
                      color: colors.WHITE,
                    }}>
                    {item?.category ? item?.category : 'No category available'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamily.POPPINS_REGULAR,
                      fontSize: textScale(12),
                      color: colors.WHITE,
                    }}>
                    {item?.year ? item?.year : 'No year available'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamily.POPPINS_REGULAR,
                      fontSize: textScale(12),
                      color: colors.WHITE,
                    }}>
                    {item?.seater ? item?.seater : 'No seater available'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamily.POPPINS_REGULAR,
                      fontSize: textScale(12),
                      color: colors.WHITE,
                    }}>
                    {item?.location ? item?.location : 'No location available'}
                  </Text>

                  <Image
                    resizeMode="cover"
                    source={{
                      uri:
                        Array.isArray(item.externalImage) &&
                        item.externalImage.length > 0
                          ? item.externalImage[0]
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-_Q04if8V8D3_si9dRkfhuqXAOooal8mYXg&usqp=CAU', // Fallback to local image if no image from API
                    }}
                    style={{
                      width: moderateScale(180),
                      height: moderateScale(120),
                      alignSelf: 'center',
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default HomeScreen;
