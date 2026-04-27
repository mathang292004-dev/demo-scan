import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { cloudinary } from "./cloudnary.providers";
import { Readable } from "stream";


@Injectable()
export class CloudinaryService {

  private logger = new Logger('CloudinaryService');

  async uploadFile(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }



  async deleteFile(publicId: string): Promise<{ result: string }> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      this.logger.error(`Cloudinary delete error: ${error.message}`);
      throw new BadRequestException('Failed to delete from Cloudinary');
    }
  }

}