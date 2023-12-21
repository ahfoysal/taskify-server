import { Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  priority: string;
  startsAt: string;
  endsAt: string;
  description: string;
  user: string | undefined;
  status?: string;
}

export type ITaskFilters = {
  starsAt?: string;
  endsAt?: string;
  searchTerm?: string;
};
