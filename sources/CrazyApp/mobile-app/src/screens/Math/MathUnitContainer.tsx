import React from 'react';
import {MathSettings} from '../../hooks/useMath';
import Card from '../../components/wrappers/Card';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colorTypes} from '../../lib/colors';

interface IProps {
  settings: MathSettings;
  handleShowResult: () => void;
  handleResolveUnit: (index: number, result: number) => void;
}

const MathUnitContainer: React.FC<IProps> = props => {
  const {settings, handleShowResult, handleResolveUnit} = props;
  const [currentUnit, setCurrentUnit] = React.useState<number>(0);

  const handleResolve = React.useCallback(
    (index: number, result: number) => {
      if (currentUnit < settings?.units.length - 1) {
        handleResolveUnit(index, result);
        setCurrentUnit(prev => prev + 1);
      } else {
        handleResolveUnit(index, result);
        handleShowResult();
      }
    },
    [currentUnit, settings, handleResolveUnit, handleShowResult],
  );

  return (
    <Card title={`Rechnen bis ${settings.maxValue}`} margin={20}>
      <View style={styles.container}>
        <Text style={styles.unitLabel}>
          {settings.units[currentUnit].unitLabel}
        </Text>
        <View style={styles.optionContainer}>
          {settings.units[currentUnit].options.map((option, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handleResolve(currentUnit, option)}>
                <Text style={styles.buttonText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  unitLabel: {
    fontSize: 30,
    color: '#000000',
    textAlign: 'center',
  },
  optionContainer: {
    padding: 30,
    display: 'flex',
    gap: 10,
  },
  button: {
    borderColor: colorTypes.purple,
    backgroundColor: colorTypes.purple,
    borderWidth: 2,
    borderRadius: 10,
    padding: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 24,
    color: colorTypes.white,
  },
});
export default MathUnitContainer;
