//import liraries
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import styles from './styles';
import Ripple from 'react-native-material-ripple';
import {moderateScale} from '../../styles/responsiveSize';

// create a component
const ButtonComp = ({
  onPress = () => {},
  text = '',
  leftImg = null,
  textStyle = {},
  isLoading = false,
  buttonDisabled,
  borderRadius,
  overflow,
}) => {
  return (
    <View>
      <Ripple
        onPress={onPress}
        style={{
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: moderateScale(20), // Corrected the typo here
        }}>
        <TouchableOpacity
          disabled={buttonDisabled}
          style={styles.container}
          activeOpacity={0.7}>
          {!!leftImg ? <Image source={leftImg} /> : <View />}

          {isLoading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Text style={{...styles.textStyle, ...textStyle}}>{text}</Text>
          )}

          <View />
        </TouchableOpacity>
      </Ripple>
    </View>
  );
};

//make this component available to the app
export default ButtonComp;
