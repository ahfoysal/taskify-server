import httpStatus from 'http-status';

import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { taskSearchableFields } from './task.constant';
import { ITask, ITaskFilters } from './task.interface';
import { Task } from './task.model';

const createTask = async (userID: string, payload: ITask) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const newTask = await Task.create([payload], { session });

    await User.findByIdAndUpdate(
      userID,
      { $push: { tasks: newTask[0]._id } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return newTask[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error('Transaction aborted:', error);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong');
  }
};
const getAllTasks = async (
  filters: ITaskFilters,
  pagination: IPaginationOptions
): Promise<IGenericResponse<ITask[]>> => {
  const { searchTerm, ...filterData } = filters;
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: taskSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await Task.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Task.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getAllTaskFromUser = async (id: string): Promise<ITask[] | null> => {
  const result = await Task.find({ user: id });
  return result;
};
const getSingleTaskById = async (id: string): Promise<ITask | null> => {
  const result = await Task.findById(id);

  return result;
};
const updateTask = async (
  id: string,
  payload: Partial<ITask>
): Promise<ITask | null> => {
  const result = await Task.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deleteTask = async (userID: string, taskID: string) : Promise<ITask | null>=> {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const task = await Task.findByIdAndDelete(taskID).session(session);

    await User.findByIdAndUpdate(
      userID,
      { $pull: { tasks: taskID } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return task;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error('Transaction aborted:', error);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something Went Wrong');
  }
};

export const TaskService = {
  createTask,
  getAllTasks,
  updateTask,
  getAllTaskFromUser,
  getSingleTaskById,
  deleteTask,
};
