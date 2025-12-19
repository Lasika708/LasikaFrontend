import Client from '../models/Client.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { processAndSaveImage } from '../utils/imageCropper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/clients');
fs.mkdir(uploadsDir, { recursive: true }).catch(() => {});

// Get all clients
export const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: clients
    });
  } catch (error) {
    next(error);
  }
};

// Get single client
export const getClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    res.json({
      success: true,
      data: client
    });
  } catch (error) {
    next(error);
  }
};

// Create client
export const createClient = async (req, res, next) => {
  try {
    const { name, designation, description } = req.body;

    if (!name || !designation || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, designation, and description are required'
      });
    }

    let imagePath = '';
    if (req.file) {
      // Crop and save image to 450x350 ratio
      const relativePath = await processAndSaveImage(
        req.file.buffer,
        req.file.originalname,
        uploadsDir
      );
      // Return full URL path for frontend
      const baseUrl = req.protocol + '://' + req.get('host');
      imagePath = `${baseUrl}${relativePath}`;
    }

    const client = new Client({
      name,
      designation,
      description,
      image: imagePath
    });

    await client.save();

    res.status(201).json({
      success: true,
      data: client
    });
  } catch (error) {
    next(error);
  }
};

// Update client
export const updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    const { name, designation, description } = req.body;

    if (name) client.name = name;
    if (designation) client.designation = designation;
    if (description) client.description = description;

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (client.image) {
        try {
          // Extract path from full URL
          const urlPath = new URL(client.image).pathname;
          const oldImagePath = path.join(__dirname, '..', urlPath);
          await fs.unlink(oldImagePath).catch(() => {});
        } catch (err) {
          // If it's already a relative path
          const oldImagePath = path.join(__dirname, '..', client.image);
          await fs.unlink(oldImagePath).catch(() => {});
        }
      }

      // Crop and save new image to 450x350 ratio
      const relativePath = await processAndSaveImage(
        req.file.buffer,
        req.file.originalname,
        uploadsDir
      );
      const baseUrl = req.protocol + '://' + req.get('host');
      client.image = `${baseUrl}${relativePath}`;
    }

    await client.save();

    res.json({
      success: true,
      data: client
    });
  } catch (error) {
    next(error);
  }
};

// Delete client
export const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    // Delete image if exists
    if (client.image) {
      try {
        // Extract path from full URL
        const urlPath = new URL(client.image).pathname;
        const imagePath = path.join(__dirname, '..', urlPath);
        await fs.unlink(imagePath).catch(() => {});
      } catch (err) {
        // If it's already a relative path
        const imagePath = path.join(__dirname, '..', client.image);
        await fs.unlink(imagePath).catch(() => {});
      }
    }

    await Client.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

