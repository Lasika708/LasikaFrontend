import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Crop and resize image to 450x350 ratio
 * @param {Buffer} imageBuffer - The image buffer from multer
 * @param {string} outputPath - Path where the cropped image should be saved
 * @returns {Promise<string>} - Path to the saved image
 */
export const cropImage = async (imageBuffer, outputPath) => {
  try {
    // Target dimensions: 450x350
    const targetWidth = 450;
    const targetHeight = 350;

    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata();
    const { width, height } = metadata;

    if (!width || !height) {
      throw new Error('Invalid image dimensions');
    }

    // Calculate the aspect ratios
    const targetAspect = targetWidth / targetHeight; // 450/350 = 1.2857
    const imageAspect = width / height;

    let cropOptions = {};

    if (imageAspect > targetAspect) {
      // Image is wider than target - crop width (center crop)
      const newWidth = Math.round(height * targetAspect);
      const left = Math.max(0, Math.round((width - newWidth) / 2));
      cropOptions = {
        left,
        top: 0,
        width: Math.min(newWidth, width - left),
        height: height
      };
    } else {
      // Image is taller than target - crop height (center crop)
      const newHeight = Math.round(width / targetAspect);
      const top = Math.max(0, Math.round((height - newHeight) / 2));
      cropOptions = {
        left: 0,
        top,
        width: width,
        height: Math.min(newHeight, height - top)
      };
    }

    // Ensure crop dimensions are valid
    if (cropOptions.width <= 0 || cropOptions.height <= 0) {
      throw new Error('Invalid crop dimensions');
    }

    // Crop and resize the image
    await sharp(imageBuffer)
      .extract(cropOptions)
      .resize(targetWidth, targetHeight, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 90, mozjpeg: true }) // Convert to JPEG with good quality
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    console.error('Error cropping image:', error);
    console.error('Error details:', error.message);
    throw new Error(`Failed to process image: ${error.message}`);
  }
};

/**
 * Process image buffer and save cropped version
 * @param {Buffer} imageBuffer - The image buffer from multer
 * @param {string} fileName - Desired filename
 * @param {string} uploadDir - Directory to save the image
 * @returns {Promise<string>} - Relative path to the saved image
 */
export const processAndSaveImage = async (imageBuffer, fileName, uploadDir) => {
  try {
    // Ensure directory exists
    const fs = await import('fs/promises');
    await fs.mkdir(uploadDir, { recursive: true });

    const fileExtension = '.jpg'; // Always save as JPEG after cropping
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const outputFileName = `cropped_${timestamp}_${randomStr}${fileExtension}`;
    const outputPath = path.join(uploadDir, outputFileName);

    // Crop and save the image
    await cropImage(imageBuffer, outputPath);

    // Verify file was created
    try {
      await fs.access(outputPath);
    } catch (err) {
      throw new Error('Cropped image file was not created');
    }

    // Return relative path from uploads directory
    const uploadsBaseDir = path.join(__dirname, '..', 'uploads');
    const relativePath = path.relative(uploadsBaseDir, outputPath)
      .replace(/\\/g, '/'); // Convert Windows path separators to forward slashes

    // Ensure path starts with /uploads
    const finalPath = relativePath.startsWith('uploads/') 
      ? `/${relativePath}` 
      : `/uploads/${relativePath}`;

    return finalPath;
  } catch (error) {
    console.error('Error in processAndSaveImage:', error);
    throw error;
  }
};

