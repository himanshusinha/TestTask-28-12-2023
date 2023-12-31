import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
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
import Toast from 'react-native-toast-message';
import {signUpAsyncThunk} from '../../redux/authAsyncThunk/authAsyncThunk';
import {Modal} from 'react-native-paper';
const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [area, setArea] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const dispatch = useDispatch();

  const checkValidation = () => {
    let errors = {};

    if (firstName === null || firstName.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter First Name',
        topOffset: moderateScale(60),
      });
      return;
    }

    if (lastName === null || lastName.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Last Name',
      });
      return;
    }

    if (email === null || email.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Email ID',
      });
      return;
    }

    if (mobile === null || mobile.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Mobile Number',
      });
      return;
    }

    if (password === null || password.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Password',
      });

      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}$/;
      if (!passwordRegex.test(password)) {
        errors.password =
          'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.';
      }

      return;
    }

    if (confirmPassword === null || confirmPassword.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Confirm Password',
      });
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
      });
      return;
    } else {
      setPasswordMatch(true);
    }

    if (address === null || address.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Address',
      });
      return;
    }

    if (locality === null || locality.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Locality',
      });
      return;
    }

    if (area === null || area.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Area',
      });
      return;
    }

    if (zipCode === null || zipCode.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter zipCode',
      });
      return;
    }

    if (city === null || city.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter City',
      });
      return;
    }

    handleSignUp();
  };

  const handleSignUp = () => {
    const payload = {
      firstName,
      lastName,
      email,
      phoneNumber: mobile,
      password,
      address,
      locality,
      area,
      zipcode: zipCode,
      city,
    };

    dispatch(signUpAsyncThunk(payload))
      .unwrap()
      .then(res => {
        console.log('Response:', res);

        const responseData = res.data;
        console.log('Response Data:', responseData);

        if (responseData && responseData.status === 201) {
          Toast.show({
            type: 'success',
            text1: responseData.message,
          });

          navigation.navigate(routes.LOGIN_SCREEN);
        }
      })
      .catch(error => {
        let errorMessage = error.message;

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        } else if (error.response && typeof error.response === 'string') {
          errorMessage = error.response.data.message;
        }

        Toast.show({
          type: 'error',
          text1: errorMessage,
          topOffset: moderateScale(90),
        });
      });
  };

  const navigation = useNavigation();
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
            marginTop: moderateScale(100),
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
                  Welcome Back 👋🏻
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
                    leftIcon={images.man}
                    mode="outlined"
                    label="firstName"
                    placeholder="firstName"
                    outlineColor={colors.TRANSPARENT}
                    activeOutlineColor={colors.TRANSPARENT}
                    textColor={colors.BLACK}
                    value={firstName}
                    autoCapitalize={'none'}
                    onChangeText={e => setFirstName(e)}
                  />
                </View>
                <View style={styles.viewStyle}>
                  <InputField
                    leftIcon={images.man}
                    mode="outlined"
                    label="lastName"
                    placeholder="lastName"
                    outlineColor={colors.TRANSPARENT}
                    activeOutlineColor={colors.TRANSPARENT}
                    textColor={colors.BLACK}
                    value={lastName}
                    autoCapitalize={'none'}
                    onChangeText={e => setlastName(e)}
                  />
                </View>
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
                    keyboardType={'email-address'}
                  />
                </View>
                <View style={styles.viewStyle}>
                  <InputField
                    leftIcon={images.smartphone}
                    label="Mobile Number"
                    placeholder="Mobile Number"
                    activeOutlineColor={colors.GRAY}
                    textColor={colors.GRAY}
                    value={mobile}
                    autoCapitalize={'none'}
                    onChangeText={e => setMobile(e)}
                    outlineColor={colors.GRAY}
                    mode={'flat'}
                    keyboardType={'number-pad'}
                  />
                </View>
                <View style={styles.viewStyle}>
                  <InputField
                    leftIcon={images.lock}
                    rightIcon={isPasswordVisible ? images.hide : images.show}
                    onRightIconPress={() => setIsPasswordVisible(prev => !prev)}
                    label="Password"
                    placeholder="Password"
                    activeOutlineColor={colors.GRAY}
                    textColor={colors.GRAY}
                    value={password}
                    autoCapitalize={'none'}
                    onChangeText={e => setPassword(e)}
                    outlineColor={colors.GRAY}
                    mode={'flat'}
                  />
                </View>
                <View style={styles.viewStyle}>
                  <InputField
                    leftIcon={images.lock}
                    rightIcon={isPasswordVisible ? images.hide : images.show}
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    activeOutlineColor={colors.GRAY}
                    textColor={colors.GRAY}
                    value={confirmPassword}
                    autoCapitalize={'none'}
                    onChangeText={e => setConfirmPassword(e)}
                    outlineColor={colors.GRAY}
                    onRightIconPress={() => setIsPasswordVisible(prev => !prev)}
                    mode={'flat'}
                  />
                </View>
                <View style={styles.viewStyle}>
                  <InputField
                    leftIcon={images.navigation}
                    label="Address"
                    placeholder="Address"
                    activeOutlineColor={colors.GRAY}
                    textColor={colors.GRAY}
                    value={address}
                    autoCapitalize={'none'}
                    onChangeText={e => setAddress(e)}
                    outlineColor={colors.GRAY}
                    mode={'flat'}
                  />
                </View>
                <View style={styles.viewStyle}>
                  <InputField
                    leftIcon={images.navigation}
                    label="Locality"
                    placeholder="Locality"
                    activeOutlineColor={colors.GRAY}
                    textColor={colors.GRAY}
                    value={locality}
                    autoCapitalize={'none'}
                    onChangeText={e => setLocality(e)}
                    outlineColor={colors.GRAY}
                    mode={'flat'}
                  />
                </View>
                <View style={styles.viewStyle}>
                  <InputField
                    leftIcon={images.navigation}
                    label="Area"
                    placeholder="Area"
                    activeOutlineColor={colors.GRAY}
                    textColor={colors.GRAY}
                    value={area}
                    autoCapitalize={'none'}
                    onChangeText={e => setArea(e)}
                    outlineColor={colors.GRAY}
                    mode={'flat'}
                  />
                </View>
                <View style={styles.viewStyle}>
                  <InputField
                    leftIcon={images.navigation}
                    label="ZipCode"
                    placeholder="ZipCode"
                    activeOutlineColor={colors.GRAY}
                    textColor={colors.GRAY}
                    value={zipCode}
                    autoCapitalize={'none'}
                    onChangeText={e => setZipCode(e)}
                    outlineColor={colors.GRAY}
                    keyboardType={'number-pad'}
                    mode={'flat'}
                  />
                </View>
                <View style={styles.viewStyle}>
                  <InputField
                    leftIcon={images.navigation}
                    label="City"
                    placeholder="City"
                    activeOutlineColor={colors.GRAY}
                    textColor={colors.GRAY}
                    value={city}
                    autoCapitalize={'none'}
                    onChangeText={e => setCity(e)}
                    outlineColor={colors.GRAY}
                    mode={'flat'}
                  />
                </View>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  bottom: moderateScale(50),
                }}>
                <ButtonComp
                  text="Sign Up"
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bottom: moderateScale(20),
                  }}>
                  <TouchableOpacity
                    style={{
                      top: moderateScale(50),
                      backgroundColor: colors.GRAY,
                      width: moderateScale(50),
                      height: moderateScale(50),
                      borderRadius: moderateScale(25),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: moderateScale(10),
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
                    style={{
                      top: moderateScale(50),
                      backgroundColor: colors.GRAY,
                      width: moderateScale(50),
                      height: moderateScale(50),
                      borderRadius: moderateScale(25),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: moderateScale(10),
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
                <View style={styles.bottomContainer}>
                  <Text style={styles.signUpText}>
                    Already have an account ?
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}>
                    <Text style={styles.signUpButton}>Sign In!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignUpScreen;
