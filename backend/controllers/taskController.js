import db from '../config/database.js';
import { Task } from '../models/Task.js';

// Get all tasks
export const getTasks = async (req, res, next) => {
  try {
    const { projectId } = req.query;
    let tasks = db.tasks;

    if (projectId) {
      tasks = tasks.filter(t => t.projectId === projectId);
    }

    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// Get single task
export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = db.tasks.find(t => t.id === id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// Create task
export const createTask = async (req, res, next) => {
  try {
    const { title, description, projectId, priority, dueDate } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({
        success: false,
        message: 'Title and projectId are required'
      });
    }

    const task = new Task({
      title,
      description,
      projectId,
      priority,
      dueDate,
      createdBy: req.user?.id || '1'
    });

    db.tasks.push(task);

    res.status(201).json({
      success: true,
      data: task.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

// Update task
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskIndex = db.tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const task = db.tasks[taskIndex];
    Object.assign(task, req.body, { updatedAt: new Date() });
    db.tasks[taskIndex] = task;

    res.json({
      success: true,
      data: task.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

// Delete task
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskIndex = db.tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    db.tasks.splice(taskIndex, 1);

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};








