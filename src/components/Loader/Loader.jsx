import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import colors from '../../constants/colors';
import styles from './styles';

const Loader = ({visible}) => {
  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={() => {}}>
      <BlurView style={styles.absoluteFill} blurType="light" blurAmount={10}>
        <View style={styles.container}>
          <View style={styles.indicatorStyle}>
            <ActivityIndicator color={colors.GREEN} size={'large'} />
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

export default Loader;
