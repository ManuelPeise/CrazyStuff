import React from 'react';
import {DropdownItem} from '../components/inputs/DropdownInput';
import {MathUnitGenerator} from '../screens/Math/MathUnitGenerator';

enum MaxValueEnum {
  Ten = 10,
  Twenty = 20,
  Fifty = 50,
  Hundred = 100,
}

export enum CalculationRuleEnum {
  Addition = 0,
  Subtraction = 1,
  Mixed = 2,
}

export type MathSettings = {
  trainingIsRunning: boolean;
  calculationRule: CalculationRuleEnum;
  maxValue: MaxValueEnum;
  units: MathUnit[];
  startTime: Date;
  elapsedTime: number;
  trainingFinished: boolean;
};

export type MathUnit = {
  firstNumber: number;
  secondNumber: number;
  calculationRule: CalculationRuleEnum;
  unitLabel: string;
  result: number;
  options: number[];
  userResult: number;
};

export const useMath = () => {
  const [settings, setMathSettings] = React.useState<MathSettings>(
    {} as MathSettings,
  );

  const calculationRuleDropdownItems = React.useMemo((): DropdownItem[] => {
    return [
      {label: 'Addition', value: CalculationRuleEnum.Addition},
      {label: 'Subtraction', value: CalculationRuleEnum.Subtraction},
      {label: 'Mixed', value: CalculationRuleEnum.Mixed},
    ];
  }, []);

  const maxValueDropdownItems = React.useMemo((): DropdownItem[] => {
    return [
      {label: '10', value: MaxValueEnum.Ten},
      {label: '20', value: MaxValueEnum.Twenty},
      {label: '50', value: MaxValueEnum.Fifty},
      {label: '100', value: MaxValueEnum.Hundred},
    ];
  }, []);

  const handleCalculationRuleChanged = React.useCallback(
    (value: number | undefined) => {
      if (value !== undefined) {
        setMathSettings({...settings, calculationRule: value});
      }
    },
    [settings],
  );

  const handleMaxValueChanged = React.useCallback(
    (value: number | undefined) => {
      if (value !== undefined) {
        setMathSettings({...settings, maxValue: value});
      }
    },
    [settings],
  );

  const getElapsedTime = React.useCallback((start: Date, end: Date) => {
    return ((end.getTime() - start.getTime()) / 1000) % 60;
  }, []);

  const handleStart = React.useCallback(() => {
    const generator = new MathUnitGenerator(settings);
    generator.generateUnits();

    setMathSettings({
      ...settings,
      trainingIsRunning: true,
      units: generator.getUnits(),
      startTime: new Date(),
    });
  }, [settings]);

  const handleStop = React.useCallback(() => {
    setMathSettings({
      ...settings,
      trainingIsRunning: false,
      trainingFinished: true,
      elapsedTime: getElapsedTime(settings.startTime, new Date()),
    });
  }, [settings, getElapsedTime]);

  const handleReset = React.useCallback(() => {
    setMathSettings({
      ...settings,
      trainingIsRunning: false,
      trainingFinished: false,
      elapsedTime: 0,
    });
  }, [settings]);

  const handleUpdateUnit = React.useCallback(
    (index: number, result: number) => {
      const unitsCopy = [...settings.units];

      unitsCopy[index].userResult = result;

      setMathSettings({...settings, units: unitsCopy});
    },
    [settings],
  );

  return {
    settings,
    calculationRuleDropdownItems,
    maxValueDropdownItems,
    handleCalculationRuleChanged,
    handleMaxValueChanged,
    handleStart,
    handleStop,
    handleUpdateUnit,
    handleReset,
  };
};
