// 3 - 16 length, allow '_', '-', number, alphabet
const usernameRegex: RegExp = /^[a-z0-9_-]{3,16}$/;

export { usernameRegex };
