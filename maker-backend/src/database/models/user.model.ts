import { prop, Typegoose } from 'typegoose';

class User extends Typegoose {
  @prop({ unique: true })
  userTokenId!: string;

  @prop({ required: true })
  name!: string;

  @prop({ required: true })
  email!: string;

  @prop()
  googleId?: string;
}
const UserModel = new User().getModelForClass(User, { schemaOptions: { timestamps: true } });

export { User, UserModel };
