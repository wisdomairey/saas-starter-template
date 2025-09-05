import mongoose from 'mongoose';

export interface IUser {
  _id?: string;
  uid: string; // Firebase UID
  email: string;
  displayName?: string;
  photoURL?: string;
  stripeCustomerId?: string;
  subscription?: {
    id: string;
    status: string;
    priceId: string;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      default: null,
    },
    photoURL: {
      type: String,
      default: null,
    },
    stripeCustomerId: {
      type: String,
      default: null,
    },
    subscription: {
      id: String,
      status: String,
      priceId: String,
      currentPeriodEnd: Date,
      cancelAtPeriodEnd: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better performance
userSchema.index({ uid: 1 });
userSchema.index({ email: 1 });
userSchema.index({ stripeCustomerId: 1 });

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
