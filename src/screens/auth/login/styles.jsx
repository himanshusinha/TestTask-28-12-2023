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
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  inputContainer: {
    flex: 0.9,
    backgroundColor: colors.white,
    justifyContent: 'center',
    marginHorizontal: moderateScaleVertical(20),
    paddingBottom:
      Platform.OS === 'ios' ? moderateScale(40) : moderateScale(10),
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
    backgroundColor: colors.white,
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
    top: moderateScale(40),
  },
  errorText: {
    color: colors.RED,
    marginTop: moderateScale(10),
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
export default styles;
