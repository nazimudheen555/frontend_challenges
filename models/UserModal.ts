import { model, Schema, Document } from "mongoose";
import type { ObjectId } from 'mongoose'
import bcrypt from "bcrypt";


type CartItem = {
  productId: ObjectId;
  quantity: number;
  price: number;
}

export type UserType = Document & {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  password: string;
  isAdmin: boolean;
  cart: CartItem[];
  address: ObjectId[];
  wishlist: ObjectId[];
  comparePassword(userPassword: string): Promise<boolean>;
};

const CartItemSchema = new Schema<CartItem>({
  productId: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const UserSchema = new Schema<UserType>({
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  cart: { type: [CartItemSchema], default: [] },
  address: [{ type: Schema.Types.ObjectId, ref: "Address"}],
  wishlist: [{ type: Schema.Types.ObjectId, ref: "User" }]
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

