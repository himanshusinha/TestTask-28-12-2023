import {moderateScale, textScale} from '../../styles/responsiveSize';
import colors from '../../constants/colors';
import {Dimensions, StyleSheet} from 'react-native';

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.REDDISH,
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: Dimensions.get('window').width - 40,
  },
  textStyle: {
    color: colors.WHITE,
    fontSize: textScale(16),
  },
});
export default styles;
