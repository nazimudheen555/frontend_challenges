import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export type UserType = Document & {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  isAdmin: boolean;
  comparePassword(userPassword: string): Promise<boolean>;
};

const UserSchema = new Schema<UserType>({
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

UserSchema.pre<UserType>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hashSync(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.password;
        delete returnedObject.__v; 
      },
  });

export default model<UserType>("User", UserSchema);

