import React from 'react';
import { View} from 'react-native';
import colors from '../../constants/colors';
import styles from './styles';
import {BardIndicator} from 'react-native-indicators'
const Loader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorStyle}>
        <BardIndicator
          color={colors.BLACK}
          style={{backgroundColor: colors.WHITE}}
        />
      </View>
    </View>
  );
};

export default Loader;
