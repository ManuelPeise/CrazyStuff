import React from 'react';
import Card from '../../components/wrappers/Card';
import InputWrapper from '../../components/wrappers/InputWrapper';
import DropdownInput, {
  DropdownItem,
} from '../../components/inputs/DropdownInput';
import {MathSettings} from '../../hooks/useMath';

interface IProps {
  margin?: number;
  title: string;
  settings: MathSettings;
  calculationRuleDropdownItems: DropdownItem[];
  maxValueDropdownItems: DropdownItem[];
  actionLabel?: string;
  startDisabled: boolean;
  handleCalculationRuleChanged: (value: number | undefined) => void;
  handleMaxValueChanged: (value: number | undefined) => void;
  actionCallback?: () => void;
}

const MathSettingsCard: React.FC<IProps> = props => {
  const {
    margin,
    title,
    settings,
    calculationRuleDropdownItems,
    maxValueDropdownItems,
    actionLabel,
    startDisabled,
    handleCalculationRuleChanged,
    handleMaxValueChanged,
    actionCallback,
  } = props;

  return (
    <Card
      title={title}
      margin={margin ?? 0}
      disabled={startDisabled}
      actionLabel={actionLabel}
      actionCallback={actionCallback}>
      <InputWrapper padding={5}>
        <DropdownInput
          placeholder="Rechenart"
          items={calculationRuleDropdownItems}
          selectedValue={settings.calculationRule}
          handleChange={handleCalculationRuleChanged}
        />
      </InputWrapper>
      <InputWrapper padding={5}>
        <DropdownInput
          placeholder="Maximalwert"
          items={maxValueDropdownItems}
          selectedValue={settings.maxValue}
          handleChange={handleMaxValueChanged}
        />
      </InputWrapper>
    </Card>
  );
};

export default MathSettingsCard;
