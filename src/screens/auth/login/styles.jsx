import {Platform, StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  scale,
} from '../../../styles/responsiveSize';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  inputStyle: {
    marginBottom: moderateScaleVertical(20),
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 0.8,
    backgroundColor: colors.white,
    justifyContent: 'center',
    marginHorizontal: moderateScaleVertical(20),
    paddingBottom: moderateScale(40),
  },
  heading: {
    paddingVertical: moderateScale(30),
    alignSelf: 'center',
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    color: colors.black,
  },
  inputStyle: {
    paddingBottom: moderateScaleVertical(30),
  },
  bottomContainer: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
    marginTop: moderateScaleVertical(40),
  },
  signUpText: {
    fontSize: scale(14),
  },
  signUpButton: {
    color: colors.themeColor,
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  scrollStyle: {
    marginTop: moderateScaleVertical(220),
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  viewStyle: {
    marginTop: moderateScaleVertical(10),
  },
  errorText: {
    color: colors.RED,
    marginTop: moderateScale(10),
  },
});
export default styles;
