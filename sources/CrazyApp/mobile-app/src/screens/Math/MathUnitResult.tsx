import React from 'react';
import Card from '../../components/wrappers/Card';
import {MathSettings} from '../../hooks/useMath';
import {StyleSheet, Text, View} from 'react-native';
import {colorTypes} from '../../lib/colors';

interface IProps {
  settings: MathSettings;
  onClose: () => void;
}

const MathUnitResult: React.FC<IProps> = props => {
  const {settings, onClose} = props;

  const getCircleColor = React.useCallback(
    (success: number, unitCount: number) => {
      const result = (unitCount / 100) * success;

      if (result < 0.4) {
        return colorTypes.red;
      }

      if (result > 0.4 && result < 0.7) {
        return colorTypes.orange;
      }

      return colorTypes.green;
    },
    [],
  );

  const resultCircle = React.useMemo(() => {
    const successResult = settings.units.filter(
      unit => unit.result === unit.userResult,
    );

    const color = getCircleColor(successResult.length, settings.units.length);

    return (
      <View style={[styles.circle, {borderColor: color}]}>
        <Text
          style={
            styles.text
          }>{`${successResult.length} / ${settings.units.length}`}</Text>
      </View>
    );
  }, [settings, getCircleColor]);

  return (
    <Card
      title="Ergebnis"
      margin={20}
      actionLabel="OK"
      actionCallback={onClose}>
      <View style={styles.container}>
        {resultCircle}
        <Text style={styles.text}>{`Zeit: ${settings.elapsedTime.toFixed(
          0,
        )} Sekunden`}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  circle: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 5,
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
});
export default MathUnitResult;
