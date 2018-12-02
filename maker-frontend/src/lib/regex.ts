export const emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 6 - 20 length, alphabet, least contain one single number or Special Characters
export const passwordRegex: RegExp = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
// 3 - 16 length, allow '_', '-', number, alphabet
export const usernameRegex: RegExp = /^[A-za-z0-9_-]{3,16}$/;
