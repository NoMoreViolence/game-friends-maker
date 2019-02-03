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
// return true: all value is valid
// return false: something is invalid
const checkValidationAll = (testCases: CheckValidation[]): Promise<CheckReturnValue> =>
  new Promise((resolve, reject) => {
    pipe(
      // Regex Test === true ? true : false
      map((unit: CheckValidation) => unit.regex.test(unit.value) && !isNil(unit.value)),
      // Find Err
      findIndex((unit: boolean) => !unit),
      // unit === -1 ? Success : Failure
      (unit: number) => (unit === -1 ? resolve({ result: true, errRegex: '' }) : reject({ result: false, errRegex: testCases[unit].name }))
    )(testCases);
  });

export { checkValidationAll, CheckReturnValue };
