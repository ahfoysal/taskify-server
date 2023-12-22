import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { taskFilterableFields } from './task.constant';
import { ITask } from './task.interface';
import { TaskService } from './task.service';

const createTask: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id, email }: any = req.user;

    const payload = { ...req.body, user: id, email };
    const result = await TaskService.createTask(id, payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Task created successfully!',
      data: result,
    });
  }
);

const getAllTasks = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, taskFilterableFields);
  const result = await TaskService.getAllTasks(filters, paginationOptions);

  sendResponse<ITask[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getAllTaskFromUser = catchAsync(async (req: Request, res: Response) => {
  const { id }: any = req.user;

  const result = await TaskService.getAllTaskFromUser(id);

  sendResponse<ITask[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task retried  successfully',
    data: result,
  });
});
const getSingleTaskById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await TaskService.getSingleTaskById(id);

  sendResponse<ITask>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task retried  successfully',
    data: result,
  });
});
const updateTask = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...data } = req.body;
  const result = await TaskService.updateTask(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task updated  successfully',
    data: result || {
      id: "1adsasd1",
      title: "",
    description: "",
    startsAt: "",
    endsAt:"",
    status: ""
    },
  });
});
const deleteTask = catchAsync(async (req: Request, res: Response) => {
  const { id: taskID } = req.params;
  const { id }: any = req.user;

  const result = await TaskService.deleteTask(id, taskID);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task deleted  successfully',
    data: result || {
      id: "1adsasd1",
      title: "",
    description: "",
    startsAt: "",
    endsAt:"",
    status: ""
    },
  });
});
export const TaskController = {
  getAllTasks,
  createTask,
  updateTask,
  getAllTaskFromUser,
  getSingleTaskById,
  deleteTask,
};
