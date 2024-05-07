import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationEnum} from '../../lib/enums/NavigationEnum';
import MathScreen from '../../screens/Math/MathScreen';
import {StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();

const MainStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={NavigationEnum.Math}>
      <Stack.Screen
        name={NavigationEnum.Math}
        component={MathScreen}
        options={{
          headerShown: true,
          headerTitle: 'Mathetraining',
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          headerTintColor: '#ffffff',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#000024',
  },
  headerTitle: {
    fontFamily: 'sans-serif',
    fontWeight: '500',
    fontSize: 20,
  },
});
export default MainStack;
