import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

interface IProps extends PropsWithChildren {
  padding: number;
}

const InputWrapper: React.FC<IProps> = props => {
  const {padding, children} = props;
  return <View style={[styles.container, {padding: padding}]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default InputWrapper;
