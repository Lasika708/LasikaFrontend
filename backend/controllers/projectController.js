import db from '../config/database.js';
import { Project } from '../models/Project.js';

// Get all projects
export const getProjects = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: db.projects
    });
  } catch (error) {
    next(error);
  }
};

// Get single project
export const getProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = db.projects.find(p => p.id === id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// Create project
export const createProject = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const project = new Project({
      title,
      description,
      status,
      createdBy: req.user?.id || '1'
    });

    db.projects.push(project);

    res.status(201).json({
      success: true,
      data: project.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

// Update project
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectIndex = db.projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const project = db.projects[projectIndex];
    Object.assign(project, req.body, { updatedAt: new Date() });
    db.projects[projectIndex] = project;

    res.json({
      success: true,
      data: project.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

// Delete project
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const projectIndex = db.projects.findIndex(p => p.id === id);

    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    db.projects.splice(projectIndex, 1);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};








