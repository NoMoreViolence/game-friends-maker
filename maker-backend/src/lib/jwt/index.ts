import { createJWT, decodeJWT } from './jwt';

export default { createJWT, decodeJWT };

console.log(createJWT(1, 'awef', 'awfe').toString());
console.log(new Buffer(new Buffer(createJWT(1, 'awef', 'awfe'), 'base64').toString(), 'base64'));
console.log(Buffer.from(createJWT(1, 'awef', 'awfe'), 'base64').toString());
console.log(createJWT(1, 'awef', 'awfe'));

decodeJWT(createJWT(1, 'awef', 'awfe'))
  .then(data => console.log(data))
  .catch(err => console.log(err));
