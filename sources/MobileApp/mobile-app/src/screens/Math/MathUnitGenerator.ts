import {CalculationRuleEnum, MathSettings, MathUnit} from '../../hooks/useMath';

type UnitData = {
  firstNumber: number;
  secondNumber: number;
  rule: CalculationRuleEnum.Addition | CalculationRuleEnum.Subtraction;
};

export class MathUnitGenerator {
  private _settings: MathSettings;
  private _units: MathUnit[];

  constructor(settings: MathSettings) {
    this._settings = settings;
    this._units = [];
  }

  public generateUnits = () => {
    const firstNumbers = [] as number[];

    for (let i = 0; i < 10; i++) {
      firstNumbers.push(this.getRandomNumber(this._settings.maxValue, [], 1));
    }

    firstNumbers.forEach(num => {
      const unitData = this.getUnitData(this._settings.calculationRule, num);

      const unit: MathUnit = {
        firstNumber: unitData.firstNumber,
        secondNumber: unitData.secondNumber,
        calculationRule: unitData.rule,
        result: this.getResult(unitData, unitData.rule),
        unitLabel: this.getUnitLabel(unitData),
        options: this.shuffle(
          this.getResultOptions(this.getResult(unitData, unitData.rule)),
        ),
        userResult: -1,
      };

      this._units.push(unit);
    });
  };

  public getUnits = () => {
    return this._units;
  };

  private getUnitData = (
    rule: CalculationRuleEnum,
    firstNumber: number,
  ): UnitData => {
    switch (rule) {
      case CalculationRuleEnum.Addition:
        return {
          firstNumber: firstNumber,
          secondNumber: this.getRandomNumber(
            this._settings.maxValue - firstNumber,
            [],
            1,
          ),
          rule: CalculationRuleEnum.Addition,
        };
      case CalculationRuleEnum.Subtraction:
        return {
          firstNumber: firstNumber,
          secondNumber: this.getRandomNumber(firstNumber, [], 1),
          rule: CalculationRuleEnum.Subtraction,
        };
      case CalculationRuleEnum.Mixed:
        const randomRule = this.getRandomNumber(2, []) as CalculationRuleEnum;
        return this.getUnitData(randomRule, firstNumber);
    }
  };

  private getResult = (
    unitData: UnitData,
    rule: CalculationRuleEnum,
  ): number => {
    switch (rule) {
      case CalculationRuleEnum.Addition:
        return unitData.firstNumber + unitData.secondNumber;
      case CalculationRuleEnum.Subtraction:
        const maxNumber = Math.max(unitData.firstNumber, unitData.secondNumber);
        const minNumber =
          unitData.firstNumber === maxNumber
            ? unitData.secondNumber
            : unitData.firstNumber;
        console.log(`${maxNumber} - ${minNumber} = ${maxNumber - minNumber}`);
        return maxNumber - minNumber;
      case CalculationRuleEnum.Mixed:
        const randomRule = this.getRandomNumber(2, [] as number[]);
        return this.getResult(
          {
            firstNumber: unitData.firstNumber,
            secondNumber: unitData.secondNumber,
            rule: randomRule,
          },
          randomRule,
        );
      default:
        return -1;
    }
  };

  private getRandomNumber = (
    max: number,
    numbersToExclude: number[],
    min?: number,
  ) => {
    let random = 0;

    do {
      if (min) {
        random = Math.floor(Math.random() * (max - min) + min);
      } else {
        random = Math.floor(Math.random() * max);
      }
    } while (numbersToExclude.includes(random));

    return random;
  };

  private getUnitLabel = (unitData: UnitData) => {
    return `${unitData.firstNumber}${this.getCalculationRuleSign(
      unitData.rule,
    )}${unitData.secondNumber} = `;
  };

  private getCalculationRuleSign = (
    rule: CalculationRuleEnum.Addition | CalculationRuleEnum.Subtraction,
  ) => {
    switch (rule) {
      case CalculationRuleEnum.Addition:
        return ' + ';
      case CalculationRuleEnum.Subtraction:
        return ' - ';
    }
  };

  private getResultOptions = (result: number) => {
    const options = [result];

    while (options.length < 4) {
      options.push(this.getRandomNumber(this._settings.maxValue, options));
    }

    return options;
  };

  private shuffle = (array: number[]) => {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };
}
