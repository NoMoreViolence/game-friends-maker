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
const checkValidationSome = (value: CheckValidation[]): Promise<CheckReturnValue> =>
  new Promise((resolve, reject) => {
    pipe(
      map((data: CheckValidation) => data.regex.test(data.value) && !isNil(data.value)),
      findIndex((data: boolean) => data),
      (data: number) => {
        data === -1 ? resolve({ result: false, errRegex: '' }) : resolve({ result: true, errRegex: '' });
      }
    )(value);
  });

export { checkValidationSome };
