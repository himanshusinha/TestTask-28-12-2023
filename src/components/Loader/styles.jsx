import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  indicatorStyle: {
    width: 100,
    height: 100,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  container: {
    height: Dimensions.get('window').height / 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
