import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/components/navigation/MainStack';
import 'react-native-gesture-handler';

const App: React.FC = () => {
  console.log('Main');
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};

export default App;
