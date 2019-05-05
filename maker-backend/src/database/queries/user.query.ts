import { User } from 'database/models';
import { Any, FindOneOptions, IsNull, Not, Repository } from 'typeorm';

export const getUserByEmail = (
  trans: { entity: Repository<User> },
  userEmail: string,
  option: FindOneOptions<User> = {},
  all: boolean = false
): Promise<User | undefined> =>
  trans.entity.findOne({
    where: {
      deletedAt: all ? Any([Not(IsNull()), IsNull()]) : IsNull(),
      email: userEmail
    },
    ...option
  });

export const getUserByUserId = (
  trans: { entity: Repository<User> },
  userId: number,
  option: FindOneOptions<User> = {},
  all: boolean = false
): Promise<User | undefined> =>
  trans.entity.findOne({
    where: {
      deletedAt: all ? Any([Not(IsNull()), IsNull()]) : IsNull(),
      id: userId
    },
    ...option
  });

export const createUser = (trans: { entity: Repository<User>; userData: Partial<User> }): Promise<User> => {
  const user = new User();

  user.email = trans.userData.email;
  user.googleId = trans.userData.googleId;
  user.name = trans.userData.name;
  user.salt = trans.userData.salt;

  return trans.entity.save(user);
};
