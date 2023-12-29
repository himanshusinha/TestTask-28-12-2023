import {View, StatusBar, SafeAreaView} from 'react-native';
import React from 'react';
import styles from './styles';

const AppStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

export default AppStatusBar;
