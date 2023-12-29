import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputField from '../../../components/input/InputField';
import styles from './styles';
import images from '../../../constants/images';
import colors from '../../../constants/colors';
import {moderateScale} from '../../../styles/responsiveSize';
import ButtonComp from '../../../components/button/ButtonComp';
import fontFamily from '../../../styles/fontFamily';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {loginAsyncThunk} from '../../redux/authAsyncThunk/authAsyncThunk';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../constants/routes';
import {setAuthResponse} from '../../redux/slices/auth.slice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const checkValidation = () => {
    if (email === null || email.trim() === '') {
      Toast.show({
        type: 'error',
        text1: 'Please enter name',
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
        console.log(token);
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
        console.error('Error signing in:', error);
        Toast.show({
          type: 'error',
          text1: error.response.data.message,
          topOffset: moderateScale(90),
        });
      }
    }
  };

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
              justifyContent: 'center',
              alignItems: 'center',
              bottom: moderateScale(20),
            }}>
            <ButtonComp
              text="Login"
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
          <View style={styles.bottomContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(routes.SIGN_UP_SCREEN)}>
              <Text style={styles.signUpButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
