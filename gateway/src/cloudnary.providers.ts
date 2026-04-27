import { v2 as cloudinary } from 'cloudinary';
import * as config from 'config';
import { Logger } from '@nestjs/common';

const logger = new Logger('CloudinaryProvider');

const cloudinaryConfig = config.get('cloudinary');

// Validate Cloudinary configuration
if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
  logger.error('Missing Cloudinary configuration. Please check your config file.');
  throw new Error('Cloudinary configuration is incomplete');
}

cloudinary.config({
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: cloudinaryConfig.api_secret,
});

// Test the configuration
cloudinary.api.ping()
  .then(() => logger.log('Cloudinary configuration is valid'))
 .catch((error) => {
  logger.error('Cloudinary configuration test failed:', error.error);
  throw new Error('Cloudinary configuration test failed');
});

export { cloudinary };
