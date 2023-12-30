import {View} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputField from '../../../components/input/InputField';
import styles from './styles';
import images from '../../../constants/images';
import colors from '../../../constants/colors';
import {moderateScale} from '../../../styles/responsiveSize';
import {useNavigation} from '@react-navigation/native';
import ButtonComp from '../../../components/button/ButtonComp';
import fontFamily from '../../../styles/fontFamily';
import axios from 'axios';
import routes from '../../../constants/routes';
import Toast from 'react-native-toast-message';
import {signUpAsyncThunk} from '../../redux/authAsyncThunk/authAsyncThunk';
import {useDispatch} from 'react-redux';
const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [area, setArea] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const checkValidation = () => {
    if (email === null || email.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter firstName',
        topOffset: moderateScale(60),
      });
    } else if (lastName === null || lastName.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter lastName',
      });
    } else if (email === null || email.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Email ID',
      });
    } else if (mobile === null || mobile.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Mobile Number',
      });
    } else if (password === null || password.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Password',
      });
    } else if (address === null || address.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Address',
      });
    } else if (locality === null || locality.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Locality',
      });
    } else if (area === null || area.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter Area',
      });
    } else if (zipCode === null || zipCode.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter zipCode',
      });
    } else if (city === null || city.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please Enter City',
      });
    } else {
      handleSignUp();
    }
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
        if (error.response && error.response.status === 401) {
          Toast.show({
            type: 'error',
            text1: error.response.data.message,
          });
        } else {
          console.error('Error signing in:', error);
          Toast.show({
            type: 'error',
            text1: error.response.data.message,
            topOffset: moderateScale(90),
          });
        }
      });
  };

  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollStyle}>
      <View>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <View style={styles.viewStyle}>
              <InputField
                leftIcon={images.Email}
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
                leftIcon={images.Email}
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
                leftIcon={images.Email}
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
                leftIcon={images.Lock}
                rightIcon={images.Hide}
                label="Mobile Number"
                placeholder="Mobile Number"
                activeOutlineColor={colors.GRAY}
                textColor={colors.GRAY}
                value={mobile}
                autoCapitalize={'none'}
                onChangeText={e => setMobile(e)}
                secureTextEntry={true}
                outlineColor={colors.GRAY}
                mode={'flat'}
              />
            </View>
            <View style={styles.viewStyle}>
              <InputField
                leftIcon={images.Lock}
                rightIcon={images.Hide}
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

            <View style={styles.viewStyle}>
              <InputField
                leftIcon={images.Lock}
                rightIcon={images.Hide}
                label="Address"
                placeholder="Address"
                activeOutlineColor={colors.GRAY}
                textColor={colors.GRAY}
                value={address}
                autoCapitalize={'none'}
                onChangeText={e => setAddress(e)}
                secureTextEntry={true}
                outlineColor={colors.GRAY}
                mode={'flat'}
              />
            </View>
            <View style={styles.viewStyle}>
              <InputField
                leftIcon={images.Lock}
                rightIcon={images.Hide}
                label="Locality"
                placeholder="Locality"
                activeOutlineColor={colors.GRAY}
                textColor={colors.GRAY}
                value={locality}
                autoCapitalize={'none'}
                onChangeText={e => setLocality(e)}
                secureTextEntry={true}
                outlineColor={colors.GRAY}
                mode={'flat'}
              />
            </View>
            <View style={styles.viewStyle}>
              <InputField
                leftIcon={images.Lock}
                rightIcon={images.Hide}
                label="Area"
                placeholder="Area"
                activeOutlineColor={colors.GRAY}
                textColor={colors.GRAY}
                value={area}
                autoCapitalize={'none'}
                onChangeText={e => setArea(e)}
                secureTextEntry={true}
                outlineColor={colors.GRAY}
                mode={'flat'}
              />
            </View>
            <View style={styles.viewStyle}>
              <InputField
                leftIcon={images.Lock}
                rightIcon={images.Hide}
                label="ZipCode"
                placeholder="ZipCode"
                activeOutlineColor={colors.GRAY}
                textColor={colors.GRAY}
                value={zipCode}
                autoCapitalize={'none'}
                onChangeText={e => setZipCode(e)}
                secureTextEntry={true}
                outlineColor={colors.GRAY}
                mode={'flat'}
              />
            </View>
            <View style={styles.viewStyle}>
              <InputField
                leftIcon={images.Lock}
                rightIcon={images.Hide}
                label="City"
                placeholder="City"
                activeOutlineColor={colors.GRAY}
                textColor={colors.GRAY}
                value={city}
                autoCapitalize={'none'}
                onChangeText={e => setCity(e)}
                secureTextEntry={true}
                outlineColor={colors.GRAY}
                mode={'flat'}
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              bottom: moderateScale(20),
            }}>
            <ButtonComp
              text="Sign Up"
              textStyle={{
                color: colors.WHITE,
                fontWeight: 'bold',
                fontFamily: fontFamily.POPPINS_BOLD,
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
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;
