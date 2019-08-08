import { prop, Typegoose } from 'typegoose';

class User extends Typegoose {
  @prop({ required: true, unique: true })
  userTokenId!: number;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  email!: string;

  @prop()
  googleId?: string;
}
const UserModel = new User().getModelForClass(User, { schemaOptions: { timestamps: true } });

export { User, UserModel };
