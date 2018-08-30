const makeSalt = () => Math.floor(Math.random() * 1000000 + 1).toString();

export { makeSalt };
