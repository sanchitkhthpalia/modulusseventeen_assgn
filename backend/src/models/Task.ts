import mongoose, { Schema, Document, Types } from 'mongoose';

export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface ITask extends Document {
  title: string;
  description?: string;
  datetime?: Date;
  deadline?: Date;
  priority: TaskPriority;
  completed: boolean;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String },
    datetime: { type: Date },
    deadline: { type: Date },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    completed: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true }
  },
  { timestamps: true }
);

export const Task = mongoose.model<ITask>('Task', TaskSchema);


