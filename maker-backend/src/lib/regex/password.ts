// 6 - 20 length, alphabet, least contain one single number or Special Characters
const passwordRegex: RegExp = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;

export { passwordRegex };
