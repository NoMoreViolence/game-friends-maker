import { map, findIndex, pipe } from 'ramda';

interface CheckValidation {
  regex: RegExp;
  value: string;
}
// Regex test function
// return true: some value is valid
// return false: all value is invalid
const checkValidationSome = (value: CheckValidation[]): boolean =>
  pipe(
    map((data: CheckValidation) => data.regex.test(data.value)),
    findIndex((data: boolean) => data)
  )(value) !== -1
    ? true
    : false;

export { checkValidationSome };
