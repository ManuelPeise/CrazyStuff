import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationEnum} from '../../lib/enums/NavigationEnum';

const StartScreen: React.FC = () => {
  const nav = useNavigation();

  const navigate = React.useCallback(() => {
    nav.navigate(NavigationEnum.Math as never);
  }, [nav]);
  return (
    <View>
      <Text>Hallo</Text>
      <TouchableOpacity onPress={navigate}>
        <Text>Teaaats</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartScreen;
