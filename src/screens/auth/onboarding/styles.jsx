import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    width: '100%',
  },
  backgroundStyle: {
    flex: 0.86,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: textScale(15),
    color: colors.WHITE,
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
  },
  subtitle: {
    color: colors.BLACK,
    fontSize: textScale(13),
    marginTop: moderateScale(10),
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: moderateScale(23),
    top: moderateScale(30),
  },
  title: {
    color: colors.WHITE,
    fontSize: textScale(18.31),
    fontWeight: 'bold',
    textAlign: 'center',
    top: moderateScale(28),
    color: colors.BLACK,
  },

  image: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  indicator: {
    height: moderateScale(12),
    width: moderateScale(12),
    backgroundColor: colors.GRAY,
    marginHorizontal: moderateScale(3),
    borderRadius: moderateScale(6),
    bottom: moderateScale(18),
  },
  btn: {
    flex: 1,
    height: moderateScale(50),
    borderRadius: moderateScale(13),
    backgroundColor: colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: moderateScale(20),
  },
});
export default styles;
