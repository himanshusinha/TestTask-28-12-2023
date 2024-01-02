import {useState} from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import images from '../../constants/images';
import styles from './styles';
import {moderateScale, textScale} from '../../styles/responsiveSize';

const InputField = ({
  value,
  onChangeText,
  rightIcon,
  leftIcon,
  keyboardType,
  label,
  isPassword,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  const theme = useTheme();
  const {colors} = theme;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={leftIcon}
        style={[
          styles.imageStyle,
          {
            tintColor: isFocused ? '#0096FF' : 'grey',
          },
        ]}
      />

      <TextInput
        style={{
          flex: 1,
          height: moderateScale(50),
          borderRadius: 20,
          backgroundColor: colors.GRAY,
          fontSize: textScale(10),
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoCapitalize="none"
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        label={<Text style={{color: 'grey'}}>{label}</Text>}
        mode={'flat'}
        underlineColor="transparent"
        theme={{...theme, colors: {...colors, primary: 'transparent'}}}
        secureTextEntry={isPasswordVisible}
        keyboardType={keyboardType}
      />

      {rightIcon && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Image
            source={!isPasswordVisible ? images.show : images.hide}
            style={[
              styles.imageStyle,
              {
                tintColor: isFocused ? '#0096FF' : 'grey',
              },
            ]}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
