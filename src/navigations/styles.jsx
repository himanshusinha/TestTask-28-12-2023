import {StyleSheet} from 'react-native';
import colors from '../constants/colors';
const styles = StyleSheet.create({
  button: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.themeColor,
  },
  shadow: {
    shadowColor: colors.blackOpacity30,
    shadowOffset: {
      width: 0,
      height: 7.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
export default styles;
