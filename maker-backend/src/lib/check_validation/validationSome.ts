import { map, findIndex, pipe, isNil } from 'ramda';

interface CheckValidation {
  regex: RegExp;
  value: string;
  name: string;
}

interface CheckReturnValue {
  result: boolean;
  errRegex: string;
}
// Regex test function
// return true: some value is valid
// return false: all value is invalid
const checkValidationSome = (testCases: CheckValidation[]): Promise<CheckReturnValue> =>
  new Promise((resolve, reject) => {
    pipe(
      // Regex Test === true ? true : false
      map((unit: CheckValidation) => unit.regex.test(unit.value) && !isNil(unit.value)),
      // unit === -1 ? Success : Failure
      findIndex((unit: boolean) => unit),
      // data === -1 ? all regex test failed : at least one of value is successful
      (unit: number) => {
        unit === -1 ? resolve({ result: false, errRegex: '' }) : resolve({ result: true, errRegex: '' });
      }
    )(testCases);
  });

export { checkValidationSome };
