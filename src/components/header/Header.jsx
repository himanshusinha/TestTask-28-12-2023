import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale, textScale} from '../../styles/responsiveSize';
import colors from '../../constants/colors';
import fontFamily from '../../styles/fontFamily';

const Header = ({
  iconCountryFlag,
  titleCountryName,
  iconDropDown,
  iconBell,
  iconGift,
  titleGift,
  onPress,
}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginStart: moderateScale(26),
          marginTop: moderateScale(50),
        }}>
        <Image
          source={iconCountryFlag}
          style={{width: moderateScale(25), height: moderateScale(25)}}
        />
        <Text
          style={{
            fontSize: textScale(16),
            color: colors.WHITE,
            fontFamily: fontFamily.POPPINS_SEMI_BOLD,
            marginStart: moderateScale(10),
          }}>
          {titleCountryName}
        </Text>
        <Image
          source={iconDropDown}
          style={{
            width: moderateScale(25),
            height: moderateScale(25),
            marginStart: moderateScale(5),
          }}
        />
      </TouchableOpacity>
      <View style={{flex: 1}}></View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          marginTop: moderateScale(40),
          marginEnd: moderateScale(10),
          borderWidth: 1,
          borderColor: colors.WHITE,
          padding: 8,
          paddingHorizontal: moderateScale(10),
          borderRadius: moderateScale(20),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={iconGift}
          style={{width: moderateScale(25), height: moderateScale(25)}}
        />
        <Text
          style={{
            fontSize: textScale(12),
            color: colors.WHITE,
            fontFamily: fontFamily.POPPINS_SEMI_BOLD,
            marginStart: moderateScale(10),
          }}>
          {titleGift}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={iconBell}
          style={{
            width: moderateScale(25),
            height: moderateScale(25),
            marginTop: moderateScale(50),
            marginEnd: moderateScale(13),
            alignSelf: 'center',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
