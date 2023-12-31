import {Platform, StyleSheet} from 'react-native';
import {
  moderateScale,
  moderateScaleVertical,
  scale,
} from '../../../styles/responsiveSize';
import colors from '../../../constants/colors';
import fontFamily from '../../../styles/fontFamily';

const styles = StyleSheet.create({
  inputStyle: {
    marginBottom: moderateScaleVertical(20),
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    marginTop: 10,
  },
  inputContainer: {
    flex: 0.9,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    marginHorizontal: moderateScaleVertical(20),
    marginTop: moderateScaleVertical(100),
  },
  heading: {
    paddingVertical: moderateScale(30),
    alignSelf: 'center',
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    color: colors.black,
  },
  inputStyle: {
    paddingBottom: moderateScaleVertical(40),
  },
  bottomContainer: {
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
    marginTop: moderateScaleVertical(40),
  },
  signUpText: {
    fontSize: scale(10),
    fontFamily: fontFamily.POPPINS_REGULAR,
    color: 'black',
  },
  signUpButton: {
    fontSize: scale(10),
    fontFamily: fontFamily.POPPINS_SEMI_BOLD,
    color: colors.REDDISH,
    marginStart: moderateScale(4),
  },
  scrollStyle: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  viewStyle: {
    marginTop: moderateScaleVertical(10),
    bottom: moderateScale(70),
  },
  errorText: {
    color: colors.RED,
    marginTop: moderateScale(10),
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: moderateScale(50),
    paddingBottom: moderateScale(30),
  },
});
export default styles;
