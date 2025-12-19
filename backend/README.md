# Backend API Setup

This backend uses MongoDB to store projects and clients data.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed locally or MongoDB Atlas account

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env` (if it exists) or create a `.env` file
   - Set your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/lasika
   ```
   - For MongoDB Atlas, use:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lasika
   ```

3. Start MongoDB:
   - If using local MongoDB, make sure MongoDB service is running
   - For Windows: MongoDB should start automatically if installed as a service
   - For Linux/Mac: `sudo systemctl start mongod` or `brew services start mongodb-community`

4. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create project (with image upload - automatically cropped to 450x350)
- `PUT /api/projects/:id` - Update project (with image upload - automatically cropped to 450x350)
- `DELETE /api/projects/:id` - Delete project

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create client (with image upload - automatically cropped to 450x350)
- `PUT /api/clients/:id` - Update client (with image upload - automatically cropped to 450x350)
- `DELETE /api/clients/:id` - Delete client

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin)
- `GET /api/contact/:id` - Get single contact (admin)
- `DELETE /api/contact/:id` - Delete contact (admin)

### Newsletter
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/newsletter` - Get all subscribers (admin)
- `GET /api/newsletter/:id` - Get single subscriber (admin)
- `DELETE /api/newsletter/:id` - Unsubscribe (admin)

## File Uploads

Images are stored in the `uploads/` directory:
- Project images: `uploads/projects/`
- Client images: `uploads/clients/`

Uploaded images are accessible via: `http://localhost:3000/uploads/[type]/[filename]`

### Image Cropping

All uploaded images (projects and clients) are automatically cropped to a 450x350 ratio before being saved. The cropping:
- Maintains aspect ratio by cropping from the center
- Resizes to exactly 450x350 pixels
- Converts to JPEG format with 90% quality
- Works with any input image size or aspect ratio

## Database Models

### Project
- `name` (String, required)
- `description` (String)
- `image` (String - URL)
- `category` (String)
- `status` (String: 'active', 'completed', 'archived')
- `createdAt` (Date)
- `updatedAt` (Date)

### Client
- `name` (String, required)
- `designation` (String, required)
- `description` (String, required)
- `image` (String - URL, cropped to 450x350)
- `createdAt` (Date)
- `updatedAt` (Date)

### Contact
- `fullName` (String, required)
- `email` (String, required, validated)
- `mobile` (String, required)
- `city` (String, required)
- `message` (String, optional)
- `createdAt` (Date)
- `updatedAt` (Date)

### Newsletter
- `email` (String, required, unique, validated)
- `createdAt` (Date)
- `updatedAt` (Date)

