import mongoose from 'mongoose';

export interface IUsageStats {
  _id?: string;
  userId: string;
  period: string; // YYYY-MM format
  apiCalls: number;
  storageUsed: number; // in MB
  bandwidthUsed: number; // in MB
  createdAt: Date;
  updatedAt: Date;
}

const usageStatsSchema = new mongoose.Schema<IUsageStats>(
  {
    userId: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    apiCalls: {
      type: Number,
      default: 0,
    },
    storageUsed: {
      type: Number,
      default: 0,
    },
    bandwidthUsed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for efficient querying
usageStatsSchema.index({ userId: 1, period: 1 }, { unique: true });

export const UsageStats = mongoose.models.UsageStats || mongoose.model<IUsageStats>('UsageStats', usageStatsSchema);
