import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {moderateScale} from '../../styles/responsiveSize';
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(45),
    borderColor: colors.GRAY,
    borderWidth: moderateScale(0.5),
    borderRadius: moderateScale(10),
    backgroundColor: colors.GRAY,
  },
  imageStyle: {
    width: moderateScale(18),
    height: moderateScale(18),
    marginRight: moderateScale(5),
    marginHorizontal: moderateScale(10),
    marginLeft: moderateScale(20),
    marginEnd: moderateScale(10),
  },
  inputStyle: {
    flex: 1,
    height: moderateScale(45),
    borderRadius: moderateScale(10),
    paddingStart: moderateScale(10),
    color: colors.BLACK,
  },
});
export default styles;
