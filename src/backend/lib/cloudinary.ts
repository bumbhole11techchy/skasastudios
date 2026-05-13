import { v2 as cloudinary } from 'cloudinary';

export async function uploadImage(imageData: string, folder = 'skasastudios/products'): Promise<string> {
  const cloudinaryConfig = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };

  if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
    throw new Error('Please define CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment variables');
  }

  // Configure Cloudinary
  cloudinary.config(cloudinaryConfig);

  try {
    const result = await cloudinary.uploader.upload(imageData, {
      folder,
      resource_type: 'auto',
    });

    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}