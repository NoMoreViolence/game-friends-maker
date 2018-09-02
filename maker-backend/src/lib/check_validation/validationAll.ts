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
const checkValidationAll = (value: CheckValidation[]): Promise<CheckReturnValue> =>
  new Promise((resolve, reject) => {
    pipe(
      map((data: CheckValidation) => data.regex.test(data.value) && !isNil(data.value)),
      findIndex((data: boolean) => !data),
      (data: number) => {
        data === -1 ? resolve({ result: true, errRegex: '' }) : resolve({ result: false, errRegex: value[data].name });
      }
    )(value);
  });

export { checkValidationAll };
