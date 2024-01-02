import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Platform,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputField from '../../../components/input/InputField';
import styles from './styles';
import images from '../../../constants/images';
import colors from '../../../constants/colors';
import {moderateScale, textScale} from '../../../styles/responsiveSize';
import ButtonComp from '../../../components/button/ButtonComp';
import fontFamily from '../../../styles/fontFamily';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../constants/routes';
import {setAuthResponse} from '../../redux/slices/auth.slice';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import Loader from '../../../components/Loader/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);
  const checkValidation = () => {
    if (email === null || email.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter email',
      });
    } else if (password === null || password.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter password',
      });
    } else {
      handleLogin();
    }
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://api.injazrent.ae/user/login', {
        email: email,
        password: password,
      });

      if (response && response.data && response.data.token) {
        const token = response.data.token;
        dispatch(setAuthResponse(response.data));
        Toast.show({
          type: 'success',
          text1: response.data.message,
          topOffset: moderateScale(90),
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
          topOffset: moderateScale(90),
        });
      }
    }
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl0fwN_O2DmuoaVSmA9Hzf-gBONjOYuF_V2w&usqp=CAU',
        }}
        style={{flexGrow: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.WHITE,
            marginTop: moderateScale(200),
            borderTopLeftRadius: moderateScale(40),
            borderTopRightRadius: moderateScale(40),
            overflow: 'hidden',
          }}>
          <View style={styles.container}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={{
                  width: '8%',
                  borderRadius: moderateScale(3),
                  borderWidth: moderateScale(3),
                  borderColor: colors.GRAY_SECONDARY,
                  backgroundColor: colors.GRAY_SECONDARY,
                  height: 3,
                  marginTop: moderateScale(20),
                }}></View>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              bounces={false}
              style={{
                flexGrow: 1,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: moderateScale(10),
                }}>
                <Text
                  style={{
                    color: colors.BLACK,
                    fontSize: textScale(14),
                    fontFamily: fontFamily.POPPINS_REGULAR,
                  }}>
                  Welcome Back
                </Text>
                <Text
                  style={{
                    color: '#A9A9A9',
                    fontSize: textScale(10),
                    fontFamily: fontFamily.POPPINS_REGULAR,
                  }}>
                  Let the exploration begin...
                </Text>
                <View
                  style={{
                    width: moderateScale(80),
                    height: moderateScale(80),
                    borderRadius: moderateScale(40),
                    top: moderateScale(20),
                    overflow: 'hidden',
                  }}>
                  <Image
                    style={{
                      width: moderateScale(80),
                      height: moderateScale(80),
                    }}
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHX9FPBxJWHq5_Id7XkX9Kcx4oYH0jY1NdfA&usqp=CAU',
                    }}
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.viewStyle}>
                  <InputField
                    leftIcon={images.emaill}
                    mode="outlined"
                    label="Email ID"
                    placeholder="Email ID"
                    outlineColor={colors.TRANSPARENT}
                    activeOutlineColor={colors.TRANSPARENT}
                    textColor={colors.BLACK}
                    value={email}
                    autoCapitalize={'none'}
                    onChangeText={e => setEmail(e)}
                  />
                </View>

                <View style={styles.viewStyle}>
                  <InputField
                    leftIcon={images.lock}
                    rightIcon={images.show}
                    label="Password"
                    placeholder="Password"
                    activeOutlineColor={colors.GRAY}
                    textColor={colors.GRAY}
                    value={password}
                    autoCapitalize={'none'}
                    onChangeText={e => setPassword(e)}
                    secureTextEntry={true}
                    outlineColor={colors.GRAY}
                    mode={'flat'}
                  />
                </View>
              </View>
              <View
                style={{
                  top:
                    Platform.OS === 'ios'
                      ? moderateScale(20)
                      : moderateScale(45),
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  width: '95%',
                }}>
                <Text
                  style={{
                    color: colors.REDDISH,
                    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                  }}>
                  Forgot Password
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  top:
                    Platform.OS === 'ios'
                      ? moderateScale(35)
                      : moderateScale(60),
                }}>
                <ButtonComp
                  text="Sign In"
                  textStyle={{
                    color: colors.WHITE,
                    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.REDDISH,
                    height: moderateScale(45),
                    width: '90%',
                  }}
                  onPress={() => {
                    checkValidation();
                  }}
                />
                <View style={{flexDirection: 'row', top: moderateScale(10)}}>
                  <View
                    style={{
                      width: '24%',
                      borderWidth: moderateScale(0.3),
                      borderColor: '#A9A9A9',
                      height: 0.3,
                      top: moderateScale(10),
                    }}></View>
                  <View style={{marginHorizontal: moderateScale(10)}}>
                    <Text
                      style={{
                        color: '#A9A9A9',
                        fontSize: textScale(10),
                        fontFamily: fontFamily.POPPINS_REGULAR,
                      }}>
                      You can also connect with
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '24%',
                      borderWidth: moderateScale(0.3),
                      borderColor: '#A9A9A9',
                      height: 0.3,
                      top: moderateScale(10),
                    }}></View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',

                  top:
                    Platform.OS === 'ios'
                      ? moderateScale(70)
                      : moderateScale(70),
                  height:
                    Platform.OS === 'ios'
                      ? moderateScale(60)
                      : moderateScale(200),
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: colors.GRAY,
                    width: moderateScale(50),
                    height: moderateScale(50),
                    borderRadius: moderateScale(25),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: moderateScale(10),
                    bottom:
                      Platform.OS === 'ios'
                        ? moderateScale(0)
                        : moderateScale(50),
                  }}>
                  <Image
                    source={images.google}
                    style={{
                      width: moderateScale(30),
                      height: moderateScale(30),
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: colors.GRAY,
                    width: moderateScale(50),
                    height: moderateScale(50),
                    borderRadius: moderateScale(25),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: moderateScale(10),
                    bottom:
                      Platform.OS === 'ios'
                        ? moderateScale(0)
                        : moderateScale(50),
                  }}>
                  <Image
                    source={images.facebook}
                    style={{
                      width: moderateScale(30),
                      height: moderateScale(30),
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  top:
                    Platform.OS === 'ios'
                      ? moderateScale(90)
                      : moderateScale(-30),
                }}>
                <Text style={styles.signUpText}>Don't have an account ?</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate(routes.SIGN_UP_SCREEN)}>
                  <Text style={styles.signUpButton}>Sign Up!</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
