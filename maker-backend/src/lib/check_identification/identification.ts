import { DatabaseError } from 'sequelize';
import { User } from 'db/models';

// what: User column, value: value
const checkIdentification = (what: string, value: string): Promise<boolean> =>
  new Promise((resolve, reject) =>
    User.findOne({ where: { [what]: value } })
      .then((data: User) => (data ? reject(new Error(`Duplicate ${what} !`)) : resolve(true)))
      .catch((err: DatabaseError) => reject(new Error('User input error !')))
  );

export { checkIdentification };
