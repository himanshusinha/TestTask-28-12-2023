import {View, Image} from 'react-native';
import React, {useEffect} from 'react';
import styles from './styles';
import images from '../../../constants/images';
import AppStatusBar from '../../../components/statusbar/AppStatusBar';
import {useNavigation} from '@react-navigation/native';
import routes from '../../../constants/routes';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(routes.ON_BOARDING_SCREEN);
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image source={images.logo} style={styles.logoStyle} />
    </View>
  );
};

export default SplashScreen;
