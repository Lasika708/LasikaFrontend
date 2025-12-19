// Project model
// This is a placeholder - adapt for your database (MongoDB, PostgreSQL, etc.)

export class Project {
  constructor(data) {
    this.id = data.id || Date.now().toString();
    this.title = data.title;
    this.description = data.description || '';
    this.status = data.status || 'active';
    this.createdBy = data.createdBy;
    this.teamMembers = data.teamMembers || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Example methods
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      createdBy: this.createdBy,
      teamMembers: this.teamMembers,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

// Example: MongoDB Schema (uncomment if using Mongoose)
/*
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

export default mongoose.model('Project', projectSchema);
*/








