import {View, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import React, {useState} from 'react';
import images from '../../constants/images';
import styles from './styles';
import {moderateScale} from '../../styles/responsiveSize';
import colors from '../../constants/colors';

const InputField = ({
  value,
  onChangeText,
  placeholder,
  rightIcon,
  leftIcon,
  secureTextEntry,
  placeholderTextColor,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  mode,
  outlineColor,
  label,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Image source={leftIcon} style={styles.imageStyle} />

      <TextInput
        style={{
          width: '90%',
          height: moderateScale(40),
          borderRadius: 0,
          backgroundColor: colors.GRAY,
        }}
        autoCapitalize="none"
        autoCorrect={false}
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        mode={'flat'} // Setting mode to 'flat' will remove the outline
        underlineColor="transparent" // This will make the underline color transparent
        underlineColorAndroid="transparent" // This will make the underline color transparent on Android
      />

      {rightIcon && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image
            source={isPasswordVisible ? images.Show : images.Hide}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
