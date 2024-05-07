import React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import {useMath} from '../../hooks/useMath';
import MathSettingsCard from './MathSettingsCard';
import {images} from '../../lib/images';
import MathUnitContainer from './MathUnitContainer';
import MathUnitResult from './MathUnitResult';

const MathScreen: React.FC = () => {
  const {
    settings,
    calculationRuleDropdownItems,
    maxValueDropdownItems,
    handleCalculationRuleChanged,
    handleMaxValueChanged,
    handleStart,
    handleStop,
    handleUpdateUnit,
    handleReset,
  } = useMath();

  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground
        style={styles.imageBackground}
        source={images.books}
        resizeMode="cover">
        <View style={styles.content}>
          {!settings.trainingIsRunning && !settings.trainingFinished && (
            <MathSettingsCard
              title="Math Settings"
              startDisabled={false}
              margin={60}
              settings={settings}
              calculationRuleDropdownItems={calculationRuleDropdownItems}
              maxValueDropdownItems={maxValueDropdownItems}
              handleCalculationRuleChanged={handleCalculationRuleChanged}
              handleMaxValueChanged={handleMaxValueChanged}
              actionLabel="Start"
              actionCallback={handleStart}
            />
          )}
        </View>
        {settings.trainingIsRunning && !settings.trainingFinished && (
          <MathUnitContainer
            settings={settings}
            handleShowResult={handleStop}
            handleResolveUnit={handleUpdateUnit}
          />
        )}

        {settings.trainingFinished && (
          <MathUnitResult settings={settings} onClose={handleReset} />
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  content: {
    paddingBottom: 60,
    opacity: 1,
  },
});
export default MathScreen;
