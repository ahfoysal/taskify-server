import { Schema, Types, model } from 'mongoose';
import { ITask } from './task.interface';

const TaskSchema = new Schema<ITask>(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    startsAt: {
      type: String,
      required: true,
    },
    endsAt: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: {
        values: ['ongoing', 'done', 'todo'],
        message: '{VALUE} is not supported',
      },

      default: 'todo',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Task = model<ITask>('Task', TaskSchema);
