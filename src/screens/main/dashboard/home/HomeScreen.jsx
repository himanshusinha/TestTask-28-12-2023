import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Platform,
  StatusBar,
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
import Loader from '../../../../components/Loader/Loader';
const {height, width} = Dimensions.get('window');
const apiUrl = 'https://api.injazrent.ae/user/getAllCars';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState('');
  const flatListRef = useRef(null);
  const autoplayInterval = 3000;
  const [data, setData] = useState(bannerData);
  const [carsData, setCarsData] = useState(popularCarData);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const autoplayTimer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;

      flatListRef.current.scrollToIndex({animated: true, index: nextIndex});
      setCurrentIndex(nextIndex);
    }, autoplayInterval);

    return () => clearInterval(autoplayTimer);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(apiUrl)
      .then(response => {
        if (!response?.ok) {
          throw new Error(`HTTP error! Status: ${response?.status}`);
        }
        return response?.json();
      })
      .then(apiResponse => {
        console.log(apiResponse?.data, '........api response');
        if (Array.isArray(apiResponse?.data) && apiResponse?.data?.length > 0) {
          setCarsData(apiResponse?.data);
          setFilteredCars(apiResponse?.data);
          setIsLoading(false);
        } else {
          console.log('No car data found in the API response.');
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.error('API Error:', error);
        setIsLoading(false);
      });
  }, []);

  const handleCategoryPress = category => {
    setIsLoading(true);
    setTimeout(() => {
      const filtered = carsData.filter(car => car.category === category);
      setFilteredCars(filtered);
      setIsLoading(false);
    }, 900);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.WHITE}}>
      {isLoading && <Loader visible={isLoading} />}
      <View
        style={{
          height:
            Platform.OS === 'ios' ? moderateScale(120) : moderateScale(80),
          backgroundColor: colors.NAVY_BLUE,
          justifyContent: 'center',
        }}>
        <StatusBar
          backgroundColor={colors.BLACK}
          translucent={true}
          hidden={true}
          barStyle="dark-content"
        />
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
        bounces={false}
        contentContainerStyle={{paddingBottom: moderateScale(60)}}
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
                      overflow: 'hidden',
                    }}
                    source={item.image}>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100%',
                        borderRadius: moderateScale(20),
                        overflow: 'hidden',
                      }}>
                      <Image
                        style={{
                          width: '98%',
                          height: moderateScale(166),
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
                  height: moderateScale(2),
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
              return (
                <TouchableOpacity
                  onPress={() => handleCategoryPress(item?.category)}
                  activeOpacity={0.8}
                  style={{
                    marginTop: moderateScale(15),
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: moderateScale(10),
                    }}>
                    <Image
                      style={{
                        width: moderateScale(60),
                        height: moderateScale(60),
                      }}
                      source={item?.image}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: textScale(10),
                      fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                      color: colors.NAVY_BLUE,
                      alignSelf: 'center',
                    }}>
                    {item.category}
                  </Text>
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
              marginHorizontal: moderateScale(20),
            }}>
            <Text
              style={{
                fontSize: textScale(18),
                color: colors.NAVY_BLUE,
                fontFamily: fontFamily.POPPINS_SEMI_BOLD,
              }}>
              popular cars
            </Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text
                style={{
                  fontSize: textScale(14),
                  color: colors.NAVY_BLUE,
                  fontFamily: fontFamily.POPPINS_REGULAR,
                  fontWeight: '300',
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
                    height: moderateScale(350),
                    backgroundColor: colors.NAVY_BLUE,
                    marginHorizontal: moderateScale(10),
                    borderRadius: moderateScale(20),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginStart: moderateScale(10),
                      top: moderateScale(10),
                      backgroundColor: colors.WHITE,
                      width: moderateScale(70),
                      borderRadius: moderateScale(10),
                      padding: moderateScale(4),
                    }}>
                    <Image
                      source={images.star}
                      style={{
                        width: moderateScale(15),
                        height: moderateScale(15),
                        marginStart: moderateScale(5),
                      }}
                    />
                    <Text
                      style={{
                        color: colors.NAVY_BLUE,
                        fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                        marginStart: moderateScale(4),
                        fontSize: textScale(10),
                      }}>
                      4.0/5
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: fontFamily.POPPINS_REGULAR,
                      fontSize: textScale(12),
                      color: colors.WHITE,
                      marginStart: moderateScale(10),
                      top: moderateScale(20),
                    }}>
                    {item?.category}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamily.POPPINS_BOLD,
                      fontSize: textScale(16),
                      color: colors.WHITE,
                      marginStart: moderateScale(10),
                      marginTop: moderateScale(20),
                    }}>
                    {`${item?.brand ? item?.brand : 'No brand'} ${
                      item?.model ? item?.model : 'No model'
                    }`}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontFamily: fontFamily.POPPINS_REGULAR,
                        fontSize: textScale(12),
                        color: colors.WHITE,
                        marginStart: moderateScale(10),
                      }}>
                      {item?.seater ? item?.seater : 'No seater available'} |{' '}
                    </Text>

                    <Text
                      style={{
                        fontFamily: fontFamily.POPPINS_REGULAR,
                        fontSize: textScale(12),
                        color: colors.WHITE,
                      }}>
                      {item?.year ? item?.year : 'No year available'}
                    </Text>
                  </View>
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
                      width: '90%',
                      height: moderateScale(100),
                      alignSelf: 'center',
                      marginTop: moderateScale(20),
                      overflow: 'hidden',
                    }}
                  />
                  <View
                    style={{
                      top: moderateScale(20),
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 100,
                      marginStart: 12,
                    }}>
                    <View
                      style={{
                        width: moderateScale(70),
                        height: moderateScale(25),
                        backgroundColor: colors.WHITE,
                        borderRadius: moderateScale(5),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          top: moderateScale(10),
                        }}>
                        <Text
                          style={{
                            fontSize: textScale(10),
                            color: colors.NAVY_BLUE,
                            fontFamily: fontFamily.POPPINS_BOLD,
                          }}>
                          Day
                        </Text>
                      </View>
                      <View
                        style={{
                          top: moderateScale(20),
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            color: colors.WHITE,
                            fontFamily: fontFamily.POPPINS_BOLD,
                          }}>
                          {item?.actualPriceDaily
                            ? `${item?.actualPriceDaily} ᴬᴱᴰ`
                            : 'No price'}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: moderateScale(70),
                        height: moderateScale(25),
                        backgroundColor: colors.WHITE,
                        borderRadius: moderateScale(5),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginStart: moderateScale(4),
                      }}>
                      <View
                        style={{
                          width: moderateScale(70),
                          height: moderateScale(25),
                          backgroundColor: colors.WHITE,
                          borderRadius: moderateScale(5),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: moderateScale(10),
                          }}>
                          <Text
                            style={{
                              fontSize: textScale(10),
                              color: colors.NAVY_BLUE,
                              fontFamily: fontFamily.POPPINS_BOLD,
                            }}>
                            Week
                          </Text>
                        </View>
                        <View
                          style={{
                            top: moderateScale(20),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              color: colors.WHITE,
                              fontFamily: fontFamily.POPPINS_BOLD,
                            }}>
                            {item?.actualPriceWeekly
                              ? `${item?.actualPriceWeekly} ᴬᴱᴰ`
                              : 'No price'}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        width: moderateScale(70),
                        height: moderateScale(25),
                        backgroundColor: colors.WHITE,
                        borderRadius: moderateScale(5),
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginStart: moderateScale(4),
                      }}>
                      <View
                        style={{
                          width: moderateScale(70),
                          height: moderateScale(25),
                          backgroundColor: colors.WHITE,
                          borderRadius: moderateScale(5),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            top: moderateScale(10),
                          }}>
                          <Text
                            style={{
                              fontSize: textScale(10),
                              color: colors.NAVY_BLUE,
                              fontFamily: fontFamily.POPPINS_BOLD,
                            }}>
                            Month
                          </Text>
                        </View>
                        <View
                          style={{
                            top: moderateScale(20),
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              color: colors.WHITE,
                              fontFamily: fontFamily.POPPINS_BOLD,
                            }}>
                            {item?.actualPriceMonthly
                              ? `${item?.actualPriceMonthly} ᴬᴱᴰ`
                              : 'No price'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      top: moderateScale(46),
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => {}}
                      style={{
                        backgroundColor: colors.WHITE,
                        borderRadius: moderateScale(10),
                        width: '60%',
                        marginTop: moderateScale(13),
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                        padding: moderateScale(5),
                      }}>
                      <Text
                        style={{
                          color: colors.NAVY_BLUE,
                          fontSize: textScale(10),
                          fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                        }}>
                        See More
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              top: moderateScale(30),
              flexDirection: 'row',
            }}>
            <Image
              style={{
                width: moderateScale(10),
                height: moderateScale(2),
                marginHorizontal: moderateScale(4),
              }}
              source={images.active_dot}
            />
            <Image
              style={{
                width: moderateScale(10),
                height: moderateScale(2),
                marginHorizontal: moderateScale(4),
              }}
              source={images.inactive_dot}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default HomeScreen;
